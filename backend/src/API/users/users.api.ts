import express, { Request, Response } from "express";
import { send } from "../../utils/response";
import * as fs from 'fs-extra';
import { getUserID, getUserUUID, isAuthentified } from "../mw";
import { deleteIfExists, getExtensionFile } from "../../utils/files";
import db from "../../Sequelize/models";

const jimp = require('jimp');

const users = express();
interface UpdateUser {
    username: string;
    picture: string | undefined | null;
};

interface Emojis {
    alias: string;
    base64: string;
}

/* Return the profile picture of a specific user */
users.get('/picture/:uuid', isAuthentified, (req: Request, res: Response): void => {
    const uuid: string = req.params.uuid || null;
    const allowedExtension: string[] = ['png', 'jpg', 'jpeg', 'gif'];

    let i: number = 0;
    let fileExists: boolean = false;
    let file: string;
    while (i < allowedExtension.length && !fileExists) {
        let path: string = `./src/uploads/profile/${uuid}/picture.${allowedExtension[i]}`;
        if (fs.existsSync(path) === true) {
            fileExists = true;
            file = fs.readFileSync(path);
        }
        i += 1;
    }
    if (!fileExists)
        file = fs.readFileSync(`./src/uploads/profile/default.jpg`);
    res.contentType(fileExists ? `image/${allowedExtension[i]}` : 'image/jpg');
    res.send(file);
});

/* Return the profile of the logged user */
users.get('/me', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    const userId: number = await getUserID(req.cookies.token) || 0;
    if (userId === 0) return send(500, 'An error occured', [], res);
    const me = await db.User.findByPk(userId, {
        attributes: ['id', 'uuid', 'username']
    }).then(data => {
        return (data);
    }).catch(e => {
        console.log(e);
        return (false);
    });
    if (!me) return send(500, 'An error occured', [], res);
    return send(200, 'OK', me, res);
});

/* Update the logged user information (username and profil picture) */
users.put('/', isAuthentified, async (req: Request, res: Response):Promise<Response> => {
    const update: UpdateUser = req.body;
    const token: string = req.cookies.token;
    var ext: string = '';

    const userId: number = await getUserID(token);
    const userUuid: string = await getUserUUID(token);

    // Update username if in the body
    update.username = update?.username?.trim() || null;
    if (update.username) {
        if (update.username.length < 2 || update.username.length > 18) {
            return send(400, "Le nom d'utilisateur saisit est incorrect", [], res);
        }
    }

    // Update profile picture if in the body
    update.picture = update?.picture || null;
    if (update.picture) {
        const allowedExtension:string[] = ['png', 'jpg', 'jpeg', 'gif'];
        const path: string = `./src/uploads/profile/${userUuid}`;
        ext = getExtensionFile(update.picture);
        let regx = `data:image\/${ext};base64,`;

        // Check extension and file size
        if (allowedExtension.includes(ext) == false)
            return send(400, "L'extension de la photo de profil est incorrect. Formats acceptés: png, jpg, jpeg, gif", [], res);
        else if ((update.picture.length * (3 / 4)) - 2 > 5242880)
            return send(400, "La photo de profil est trop lourde. Taille maximale: 5 MB", [], res);

        // Delete previous profile picture
        for (let i = 0; i < allowedExtension.length; i++)
            deleteIfExists(`${path}/picture.${allowedExtension[i]}`);
        fs.mkdirSync(path, { recursive: true });
        fs.writeFileSync(`${path}/picture.${ext}`, update.picture.replace(regx, ""), 'base64');
    }


    return db.User.findOne({
        where: {
            id: userId
        }, attributes: ['id', 'username']
    }).then(async (data) => {
        if (update.username) data.username = update.username
        await data.save().catch(e => {
            console.log(e);
        });
        return send(200, "Le profil a été modifié avec succès !", { updatedProfilePicture: update.picture !== null, extension: ext }, res);
    });
});

/* Check if emoji is valid or not. If so, resize it to avoid big data through sockets */
users.post('/emoji', isAuthentified, async (req: Request, res: Response) => {
    const emojis: Emojis[] = req.body;
    if (!emojis.length) return send(400, 'No emojis sent', [], res);
    for (let i = 0; i < emojis.length; i++) {
        const el: Emojis = emojis[i];
        el.alias = el.alias?.trim();
        if (el.alias.length < 3) return send(400, "L'alias de votre emoji est trop court (trois caractères minimum", i, res);
        if (el.alias.charAt(0) !== ':') el.alias = ':' + el.alias;
        if (el.alias.charAt(el.alias.length - 1) !== ':') el.alias = el.alias + ':';
        const fileExtension = getExtensionFile(el.base64);
        const uri = el.base64.split(';base64,').pop()
        const buff = Buffer.from(uri, 'base64');
        await jimp.read(buff).then(async image => {
            image.resize(30, 30);
            if (fileExtension === 'gif') {
                el.base64 = await image.getBufferAsync('image/gif').then(data => { return 'data:' + image.getMIME() + ';base64,' + data.toString('base64')});
            } else {
                el.base64 = await image.getBase64Async(image.getMIME());
            }
        }).catch(e => {
            console.log(e);
            return send(400, "Une image envoyé est incorrecte ou inexistante", i, res);
        });
    }
    return send(200, 'OK', emojis, res); 
});

export default users;
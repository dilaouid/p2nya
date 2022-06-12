import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { send } from "../../utils/response";
import * as fs from 'fs-extra';
import { getUserID, getUserUUID, isAuthentified } from "../mw";
import { getExtensionFile } from "../../utils/files";
import db from "../../Sequelize/models";

const users = express();
interface UpdateUser {
    username: string;
    picture: string | undefined | null;
};

/* Return the profile picture of a specific user */
users.get('/picture/:uuid', isAuthentified, (req: Request, res: Response): void => {
    const uuid: string = req.params.uuid || null;
    const allowedExtension: string[] = ['png', 'jpg', 'jpeg', 'gif'];

    let i: number = 0;
    let fileExists: boolean = false;
    let file: string;
    while (i++ < allowedExtension.length && !fileExists) {
        let path: string = `./src/uploads/profile/${uuid}/picture.${allowedExtension[i]}`;
        if (fs.existsSync(path) === true) {
            fileExists = true;
            file = fs.readFileSync(path);
        }
    }
    if (!fileExists)
        file = fs.readFileSync(`./src/uploads/profile/default.jpg`);
    res.contentType(fileExists ? `image/${allowedExtension[i]}` : 'image/jpg');
    res.send(file);
});

/* Return the profile of the logged user */
users.get('/me', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    const userId: number = await getUserID(req.cookies.token) || 0;
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

    const userId: number = await getUserID(token);
    const userUuid: string = await getUserUUID(token);

    // Update username if in the body
    update.username = update?.username?.trim() || null;
    if (update.username) {
        if (update.username.length < 2 || update.username.length > 17) {
            return send(400, "Le nom d'utilisateur saisit est incorrect", [], res);
        }
    }

    // Update profile picture if in the body
    update.picture = update?.picture || null;
    if (update.picture) {
        let ext = getExtensionFile(update.picture);
        let regx = `data:image\/${ext};base64,`;
        if (['png', 'jpg', 'jpeg', 'gif'].includes(ext) == false)
            return send(400, "L'extension de la photo de profil est incorrect. Formats acceptés: png, jpg, jpeg, gif", [], res);
        else if ((update.picture.length * (3 / 4)) - 2 > 5242880)
            return send(400, "La photo de profil est trop lourde. Taille maximale: 5 MB", [], res);
        fs.mkdirSync(`./src/uploads/profile/${userUuid}`, { recursive: true });
        fs.writeFileSync(`./src/uploads/profile/${userUuid}/picture.${ext}`, update.picture.replace(regx, ""), 'base64');
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
        return send(200, "Le profil a été modifié avec succès !", [], res);
    });
});

export default users;
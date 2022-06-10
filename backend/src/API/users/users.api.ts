import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { send } from "../../utils/response";
import * as fs from 'fs-extra';
import { getUserID, isAuthentified } from "../mw";
import db from "../../Sequelize/models";

const users = express();
interface UpdateUser {
    username: string;
    picture: string;
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
    const userId: number = await getUserID(req.cookies.token);
    update.username = update?.username?.trim() || null;
    if (update.username) {
        if (update.username.length < 2 || update.username.length > 20) {
            return send(400, "Le nom d'utilisateur saisit est incorrect", [], res);
        }
    }
    return db.User.findOne({
        where: {
            id: userId
        }, attributes: ['username']
    }).then(async (data) => {
        if (update.username) data.username = update.username
        await data.save().catch(e => {
            console.log(e);
        });
        return send(200, 'OK', [], res);
    });
});

export default users;
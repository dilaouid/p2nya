import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { send } from "../../utils/response";
import { getUserID, isAuthentified } from "../mw";
import db from "../../Sequelize/models";

const users = express();
interface UpdateUser {
    username: string;
    picture: string;
};

/* Update the logged user information (username and profil picture) */
users.put('/', isAuthentified, async (req: Request, res: Response):Promise<Response> => {
    const update: UpdateUser = req.body;
    const userId = await getUserID(req.cookies.token);
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
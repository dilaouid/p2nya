import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { send } from "../../utils/response";
import { getUserID, isAuthentified } from "../mw";
import db from "../../Sequelize/models";

const rooms = express();
interface NewRoomBody {
    password: string;
}

/* Count all the active rooms ( where attributes to changes [todo] ) */
rooms.get('/count', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    return send(200, 'OK', [await db.Room.count({})], res);
});

/* Create a new Room */
rooms.post('/', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    try {
        const body: NewRoomBody = req.body;
        const id: number = await getUserID(req.cookies.token);
        body.password = body.password?.trim();
        if (body.password?.length < 3 && body.password?.length > 30)
            return send(400, 'Invalid password', [], res);
        return db.Room.create({
            id: uuidv4(),
            password: body.password,
            timeStamp: new Date().getTime(),
            users: id
        }).then(d => {
            console.log(d);
            return send(200, 'Created Room', [], res);
        }).catch(e => {
            console.log(e);
            return send(400, 'Error Occured', [], res);
        });
    } catch(e) {
        console.log(e);
        return send(400, 'Error Occured', [], res);
    }
});

export default rooms;
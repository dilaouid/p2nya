import express, { Request, Response } from "express";
import { send } from "../../utils/response";
import db from "../../Sequelize/models";

const rooms = express();

/* Count all the active rooms ( where attributes to changes [todo] ) */
rooms.get('/count', async (req: Request, res: Response): Promise<Response> => {
    return send(200, 'OK', [await db.Room.count({})], res);
});

export default rooms;
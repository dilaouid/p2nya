import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { send } from "../../utils/response";
import { getUserID, isAuthentified } from "../mw";
import db from "../../Sequelize/models";

const rooms = express();
interface NewRoomBody {
    password: string;
};

interface JoinRoomBody {
    uuid: string;
    password: string;
};

/* Count all the active rooms ( where attributes to changes [todo] ) */
rooms.get('/count', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    const count = await db.Room.count().catch(e => {
        return (0);
    });
    return send(200, 'OK', [count], res);
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
            users: id
        }).then(d => {
            return send(200, 'Created Room', {id: d.id}, res);
        }).catch(e => {
            console.log(e);
            return send(400, 'Error Occured', [], res);
        });
    } catch(e) {
        console.log(e);
        return send(500, 'Error Occured', [], res);
    }
});

/* Join a Room */
rooms.put('/', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    try {
        const body: JoinRoomBody = req.body;
        const token: string = req.cookies.token;
        const userId: number = await getUserID(token);

        const uuid: string = body.uuid || '';
        const password: string = body.password || '';
        
        return db.Room.findOne({
            where: {
                id: uuid,
                password: password
            },
            attributes: ['id', 'users', 'password']
        }).then( async (d:any) => {
            if (!d) return send(404, "Ce salon de discussion n'existe pas", [], res);
            var usersIn: number[] = d.users.split('%').map(i => Number(i));
            if (usersIn.length === parseInt(process.env.ROOM_LIMIT) && !usersIn.includes(userId)) return send(400, "Ce salon de discussion est complet", [], res);
            else if (!usersIn.includes(userId)) {
                usersIn.push(userId);
                d.users = usersIn.join('%');
                await d.save().catch(e => {
                    console.log(e);
                });
            }
            return send(200, "OK", [], res);
        }).catch( e => {
            console.log(e);
        })
    } catch(e) {
        console.log(e);
        return send(500, 'Error Occured', [], res);
    };
});

/* Check if the logged user is in a specific room and returns details */
rooms.get('/:uuid', isAuthentified, async (req: Request, res: Response): Promise<Response> => {
    const uuid: string = req.params.uuid || null;
    const userId: number = await getUserID(req.cookies.token);
    const room = await db.Room.findByPk(uuid, {
        attributes: {
            exclude: ['id', 'password']
        }
    }).catch( e => {
        console.log(e);
    });

    // If the room does not exists, or if the user is not inside of it, return a 404 (security reason)
    if (!room || room?.users.includes(userId) === false) return send(404, 'No Room Found', [], res);
    
    // Otherwise, print the uuid and not the id of the users (security reason)
    room.usersInVocal = room.usersInVocal ? room.usersInVocal.split('%').map(i => Number(i)) : [];
    room.users = room.users.split('%').map(i => Number(i));
    room.users.splice(room.users.indexOf(userId), 1);
    room.users.splice(0, 0, userId);
    for (let i = 0; i < room.users.length; i++) {
        let j: number = room.usersInVocal.indexOf(room.users[i]);
        room.users[i] = await db.User.findByPk(room.users[i], {
            attributes: ['uuid', 'username']
        }).then(d => {
            if (d) return {uuid: d.uuid, username: d.username};
        }).catch(e => {
            console.log(e);
        });
        room.usersInVocal[j] = room.users[i];
    }
    return send(200, 'OK', room, res);
});

export default rooms;
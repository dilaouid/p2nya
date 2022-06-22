import { verify, sign } from 'jsonwebtoken';
import { Response } from "express";
import db from '../Sequelize/models'
import { UserAttributes } from '../Sequelize/models/user';


interface DecodedToken {
    id: number;
    uuid: string;
};

/* Verify if a token is valid or not , and acts consequently */
export async function verifyToken (token: string, res: Response): Promise<boolean> {
    return verify(token, process.env.SECRET, async function (err, decoded: DecodedToken) {
        if (err || !decoded?.uuid || !decoded?.id)
            return (false);
        if (!decoded?.uuid) return (false);
        return db.User.findOne({
            where: {
                uuid: decoded?.uuid,
                id: decoded?.id
            }
        }).then( async (user: any) => {

            /* If an user is found , update his last activity so he wont get deleted with the cron */
            if (user !== null) {
                user.lastActive = new Date();
                await user.save();
                return true;
            }

            return false;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }).catch(e => {
        console.log(e);
        return (false);
    });
};

/* Write a token string (but does not write it into the client , it just returns a string) */
export function writeToken (user: UserAttributes): string {
    const payload = { uuid: user.uuid, id: user.id };
    return sign(payload, process.env.SECRET);
};

export function saveToken (token: string, res: any):void {
    res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, domain: process.env.DOMAIN_NAME, secure: true, sameSite: false, httpOnly: false });
};
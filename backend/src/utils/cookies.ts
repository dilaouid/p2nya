import { verify, sign } from 'jsonwebtoken';
import { Response } from "express";
import db from '../Sequelize/models'
import { UserAttributes } from '../Sequelize/models/user';


interface DecodedToken {
    id: number;
    uuid: string;
};


export async function verifyToken (token: string, ip: string, res: Response): Promise<boolean> {
    const userWithSameIp = await db.User.findOne({where: {ip: ip}});
    if (userWithSameIp) {
        userWithSameIp.lastActive = new Date();
        await userWithSameIp.save();
        const token = await writeToken(userWithSameIp);
        res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, domain: process.env.DOMAIN_NAME, secure: process.env.MODE == 'development' ? false : true,
                    sameSite: process.env.MODE == 'development' ? true : false,
                    httpOnly: false });
        return true;
    }
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

export function writeToken (user: UserAttributes): string {
    const payload = { uuid: user.uuid, id: user.id };
    return sign(payload, process.env.SECRET);
};

export function saveToken (token: string, res: any):void {
    res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, domain: process.env.DOMAIN_NAME, secure: true, sameSite: false, httpOnly: false });
};
import { verify, sign } from 'jsonwebtoken';
import db from '../Sequelize/models'
import { UserAttributes } from '../Sequelize/models/user';


interface DecodedToken {
    id: number;
    uuid: string;
};


export function verifyToken (token: string): boolean {
    return verify(token, process.env.SECRET, async function (err, decoded: DecodedToken) {
        if (err || !decoded?.uuid || !decoded?.id)
            return (false);
        if (!decoded?.uuid) return (false);
        return db.User.findOne({
            where: {
                uuid: decoded?.uuid,
                id: decoded?.id
            }
        }).then( (data:any) => {
            return (data !== undefined);
        }).catch(err => {
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
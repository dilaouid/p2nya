import {verify} from 'jsonwebtoken';
import db from '../Sequelize/models'

interface DecodedToken {
    id: number;
    uuid: string;
};

export default function verifyToken (token: string): boolean {
    return verify(token, process.env.SECRET, async function (err, decoded: DecodedToken) {
        if (err || !decoded?.uuid || !decoded?.id) {
            console.error(err ? err : 'Invalid token format');
            return (false);
        }
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
import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { createUser } from "./initial/Token";
import { verifyToken, writeToken } from "../utils/cookies";

export const isAuthentified = async (req: Request, res: Response, next): Promise<void> => {
    const ip = process.env.MODE === 'production' ? req.header('x-forwarded-for')?.split(',')[0] : req.clientIp;
    const validToken: boolean = await verifyToken(req.cookies?.token, ip, res);
    if (validToken === false) {
        res.clearCookie('token', { domain: process.env.DOMAIN_NAME, secure: true, sameSite: false, httpOnly: false });
        await createUser(ip).then(async (data) => {
            const token = await writeToken(data);
            res.cookie('token',
                token,
                { maxAge: 2 * 60 * 60 * 1000, domain: process.env.DOMAIN_NAME, secure: process.env.MODE == 'development' ? false : true,
                sameSite: process.env.MODE == 'development' ? true : false,
                httpOnly: false
                }
            );
        });
    }
    next();
};

export const getUserUUID = async (token: string): Promise<string> => {
    return await verify(token, process.env.SECRET, async function(err, decoded) {
        if (err) console.log(err);
        return err ? null : decoded.uuid;
    });
};

export const getUserID = async (token: string): Promise<number> => {
    if (!token) return (0);
    return await verify(token, process.env.SECRET, async function(err, decoded) {
        if (err) console.log(err);
        return err ? 0 : decoded.id;
    });
};
import { Response } from "express";

/** [ ESSENTIAL ] >> Used for returning every API response */
export function send(statut: number, message: string, data: Array<any> | Object, res: Response): any {
    return res.status(statut).send({
        statut: statut,
        message: message,
        data: data
    });
};
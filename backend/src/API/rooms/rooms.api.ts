import express, { Request, Response } from "express";
const app = express();

if (process.env.MODE === 'development') {
    /* Get all the available Rooms (only available on development mode) */
    app.get('/', async (req:Request, res:Response) => {
        
    });
}


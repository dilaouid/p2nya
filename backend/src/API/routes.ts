import { Request, Response } from "express";
import rooms from './rooms/rooms.api';
import users from './users/users.api';
import { isAuthentified } from './mw';
import { send } from '../utils/response';

const express         = require('express');
const api          = express.Router();

/** (GET) [ FIRST CALL ] >> Once the user comes to the homepage, this call is made -- Used to read or to create a new token for the user */
api.get('/', isAuthentified, (req: Request, res: Response): Response => {
    return send(200, 'OK', [], res)
});

api.use('/rooms', rooms);
api.use('/users', users);

export default api;
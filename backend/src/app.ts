import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { verifyToken, writeToken } from './utils/cookies';
import { send } from "./utils/response";
import { mw } from 'request-ip';
import { createUser } from "./API/initial/Token";
import e = require('cors');

require('dotenv').config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(e({ credentials: true, origin: ['http://localhost:4200'] }));
app.use(mw());

/** (GET) [ FIRST CALL ] >> Once the user comes to the homepage, this call is made -- Used to read or to create a new token for the user */
app.get('/', async (req: Request, res: Response): Promise<void> => {
  const validToken: boolean = await verifyToken(req.cookies?.token, req.clientIp, res);

  /* If the token is not valid , we have to create a new one, among with a new user in the database */
  if (validToken === false) {
    res.clearCookie('token', { domain: process.env.DOMAIN_NAME, secure: true, sameSite: false, httpOnly: false });
    await createUser(req.clientIp).then(async (data) => {
      const token = await writeToken(data);
      res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, domain: process.env.DOMAIN_NAME, secure: process.env.MODE == 'development' ? false : true,
                                  sameSite: process.env.MODE == 'development' ? true : false,
                                  httpOnly: false });
    });
  }
  return send(200, 'OK', [], res)
});

/** [ [[ 404 ]] ] */
app.get('*', (req: Request, res: Response): void => {
  res.status(404).send({
      statut: 404,
      res: 'Not Found',
      success: false,
      data: []
  });
});

/** [ LISTENING ON PORT ] */
db.sequelize.sync().then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Application listening at http://localhost:${process.env.PORT}`);
    });
});
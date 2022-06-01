import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { verifyToken } from './utils/cookies';
import { send } from "./utils/response";
import e = require('cors');
require('dotenv').config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(e({ credentials: true, origin: ['http://localhost:4200'] }));

/** (GET) [ FIRST CALL ] >> Once the user comes to the homepage, this call is made -- Used to read or to create a new token for the user */
app.get('/', async (req: Request, res: Response): Promise<void> => {
  const validToken: boolean = await verifyToken(req.cookies?.token);
  if (validToken)
    return send(200, 'OK', [], res)
  return send(401, 'Wrong or empty token', [process.env], res)
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
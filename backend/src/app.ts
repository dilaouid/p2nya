import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { send } from "./utils/response";
import { mw } from 'request-ip';
import { isAuthentified } from "./API/mw";
import api from './API/routes';
import e = require('cors');

require('dotenv').config();

const app: Application = express();

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(e({ credentials: true, origin: ['http://localhost:4200'] }));
app.use(mw());

/** (GET) [ FIRST CALL ] >> Once the user comes to the homepage, this call is made -- Used to read or to create a new token for the user */
app.get('/', isAuthentified, (req: Request, res: Response): Response => {
  return send(200, 'OK', [], res)
});

app.use('/api', api);

/** [ [[ 404 ]] ] */
app.get('*', (req: Request, res: Response): Response => {
  return send(404, 'Not Found', [], res); 
});

/** [ LISTENING ON PORT ] */
db.sequelize.sync().then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Application listening at ${process.env.PROTOCOL}://${process.env.DOMAIN_NAME}:${process.env.PORT}`);
    });
});
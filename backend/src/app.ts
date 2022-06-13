import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { send } from "./utils/response";
import { mw } from 'request-ip';
import { isAuthentified } from "./API/mw";
import api from './API/routes';
import { Server } from "http";
import e = require('cors');

require('dotenv').config();

const app: Application = express();

const server = new Server(app);
const io = require('socket.io')(server, {
  cors: {
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST"],
      credentials: true
  }
});

app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(e({ credentials: true, origin: [process.env.FRONT_URL] }));
app.set('socketio', io);
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

/* [ [[ SOCKETS.IO ]] ] */
io.on('connection', async (socket) => {
    socket.on('test', (data) => {
      console.log(data);
    });
});

/** [ LISTENING ON PORT ] */
db.sequelize.sync().then( () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server listening at ${process.env.PROTOCOL}://${process.env.DOMAIN_NAME}:${process.env.PORT}`);
    });
});
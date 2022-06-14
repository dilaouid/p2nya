import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { send } from "./utils/response";
import { getUserUUIDByHandshake } from './utils/rooms';
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
    let previousUuid: string;
    // Join a specific room
    socket.on('join', async (uuid: string) => {
        const userUUID: string = await getUserUUIDByHandshake(socket.handshake.headers.cookie);
        socket.leave(`room-${previousUuid}`);
        socket.join(`room-${uuid}`);
        socket.broadcast.to(`room-${uuid}`).emit('joined', userUUID);
        previousUuid = uuid;
        console.log(`An user joined the room ${uuid}`);

        socket.on('message', (uuid: string, content: string, emoji?: string) => {
          // First phase of testing - no emoji managment and security checks yet -- Do no take this
          // version seriously !!
          console.log('inside message sent ' + content);
          socket.broadcast.to(`room-${uuid}`).emit('message-sent', content?.trim());
        });

        socket.on('update-picture', (userUUID: string) => {
          socket.broadcast.to(`room-${uuid}`).emit('picture-updated', userUUID);
        });

        // When leaving the room
        socket.on('disconnect', async () => {
            socket.broadcast.to(`room-${uuid}`).emit('leave', userUUID);
            socket.leave(`room-${uuid}`);
        });
    });
});

/** [ LISTENING ON PORT ] */
db.sequelize.sync().then( () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server listening at ${process.env.PROTOCOL}://${process.env.DOMAIN_NAME}:${process.env.PORT}`);
    });
});
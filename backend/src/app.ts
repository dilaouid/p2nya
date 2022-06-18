import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { send } from "./utils/response";
import { getUserByUUID } from "./utils/users";
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
io.on('connection', async (socket): Promise<void> => {
    let previousUuid: string;
    // Join a specific room
    socket.on('join', async (uuid: string) => {
        const userUUID: string = await getUserUUIDByHandshake(socket.handshake.headers.cookie);
        const joinedUser = await getUserByUUID(userUUID, ['username']);
        if (!joinedUser) return ;
        socket.leave(`room-${previousUuid}`);
        socket.join(`room-${uuid}`);
        socket.broadcast.to(`room-${uuid}`).emit('joined', userUUID, joinedUser.username);
        previousUuid = uuid;

        socket.on('message', (uuid: string, content: string, picture?: boolean) => {
          // First phase of testing - no emoji managment and security checks yet -- Do no take this
          // version seriously !!
          let type: string = '';
          let substr = 0;
          if (content.substring(content.length - 15, content.length) === '<div><br></div>') {
            substr = 15;
          }
          content = content?.trim()?.substring(0, content.length - substr);
          if (content === '<div><br></div>') return;
          if (content.substring(0, 5) === '<div>' && content.substring(content.length - 6, content.length) === '</div>') {
            content = content.substring(0, content.length - 6);
            content = content.substring(5, content.length);
          }
          if (!picture && content.substring(0, 5) === '/asmr') {
            type = 'asmr';
            if (content.length === 5)
              content = '𝙄 𝙣𝙚𝙚𝙙 𝙮𝙤𝙪𝙧 𝙖𝙩𝙩𝙚𝙣𝙩𝙞𝙤𝙣';
            else
              content = content.substring(5, content.length);
          } else if (!picture) {
            type = 'message';
          }
          socket.broadcast.to(`room-${uuid}`).emit('notification', type);
          io.to(`room-${uuid}`).emit('message-sent', content, {uuid: userUUID, username: joinedUser.username}, picture);
        });

        // Socket on user updating their profile picture
        socket.on('update-picture', (userUUID: string) => {
          io.to(`room-${uuid}`).emit('picture-updated', userUUID);
        });

        // Socket on user updated their username
        socket.on('update-username', (userUUID: string, username: string) => {
          joinedUser.username = username?.trim();
          io.to(`room-${uuid}`).emit('username-updated', userUUID, username);
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
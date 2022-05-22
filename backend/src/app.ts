import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { verifyToken, writeToken, saveToken } from './utils/cookies';
import { Sequelize } from "sequelize";

/* [ Seeders ] -- To remove later */
import { users } from './Sequelize/seeders/users';
/* [ [ end of Seeders ] ]*/

require('dotenv').config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/seed', (req: Request, res: Response): void => {
  users.map(user => {
    db.User.create(user);
  });
  res.send('OK');
});

app.get('/login-test', async (req: Request, res: Response): Promise<void> => {
  const user = await db.User.findOne({
    order: [Sequelize.fn('RAND')]
  });
  const token = await writeToken(user);
  saveToken(token, res);
  res.send('OK');
});

app.get('/', async (req: Request, res: Response): Promise<void> => {
  console.log(await verifyToken(req.cookies.token));
  res.json(process.env);
});

app.get('*', (req: Request, res: Response): void => {
  res.status(404).send({
      statut: 404,
      res: 'Not Found',
      success: false,
      data: []
  });
});

db.sequelize.sync().then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Application listening at http://localhost:${process.env.PORT}`);
    });
});
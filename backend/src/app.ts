import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"
import { users } from './Sequelize/seeders/users';

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
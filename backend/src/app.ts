import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import db from "./Sequelize/models"

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

db.sequelize.sync().then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Application listening at http://localhost:${process.env.PORT}`);
    });
});
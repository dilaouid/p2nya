import rooms from './rooms/rooms.api';
import users from './users/users.api';

const express         = require('express');
const api          = express.Router();

api.use('/rooms', rooms);
api.use('/users', users);

export default api;
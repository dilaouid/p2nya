import rooms from './rooms/rooms.api';

const express         = require('express');
const api          = express.Router();

api.use('/rooms', rooms);

export default api;
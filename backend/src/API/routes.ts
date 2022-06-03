import router from './rooms/rooms.api';

const express         = require('express');
const api          = express.Router();

api.use('/rooms', router);

export default api;
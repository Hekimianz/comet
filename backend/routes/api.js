const express = require('express');
const route = express.Router();
const apiController = require('../controllers/apiController');

route.get('/chats', apiController.getChats);

route.post('/chat', apiController.sendMessage);
module.exports = route;

const express = require('express');
const route = express.Router();
const apiController = require('../controllers/apiController');

route.get('/chats', apiController.getChats);

route.post('/chat', apiController.sendMessage);

route.put('/user/changeName', apiController.changeDisplayName);
module.exports = route;

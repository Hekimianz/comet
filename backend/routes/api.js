const express = require('express');
const route = express.Router();
const apiController = require('../controllers/apiController');

route.get('/chats', apiController.getChats);

route.post('/chat', apiController.sendMessage);

route.put('/user/changeName', apiController.changeDisplayName);
route.post('/chats/new', apiController.createNewChat);
module.exports = route;

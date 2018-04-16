const express = require('express');
const app = express();
const Chat = require('./lib/chat');

const chat = Chat.createChat();

app.ws('/', function(ws, req) {

  ws.send(chat.sendUpdatedUserList());

  ws.on('message', function(msg) {
    const msgObject = JSON.parse(msg);
    switch (msgObject.type) {
      case 'newUser':
        chat.addUser(msgObject.user, ws);
        ws.id = msgObject.user.id;
        break;
      case 'updateName':
        chat.updateUserName(msgObject.user);
        chat.sendUpdatedUserList(ws);
        break;
      case 'chatMsg':
        break;
      default:
        console.log('Unknown message');
    }
  });

  ws.on('close', function(event) {
    console.log(ws.id);
    chat.removeUser(ws.id);
  })

});

app.listen(8080);

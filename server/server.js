const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const Chat = require('./lib/chat');

const chat = Chat.createChat();

app.ws('/', function(ws, req) {

  ws.send(JSON.stringify({type: 'users', users: users}));

  ws.on('message', function(msg) {
    const msgObject = JSON.parse(msg);
    switch (msgObject.type) {
      case 'newUser':
        addUser(msgObject.user, ws);
        ws.id = msgObject.user.id;
        break;
      case 'updateName':
        updateUserName(msgObject.user);
        sendUpdatedUserList(ws);
        break;
      case 'chatMsg':
        break;
      default:
        console.log('Unknown message');
    }
  });

  ws.on('close', function(event) {
    console.log(ws.id);
    removeUser(ws.id);
  })

});

app.listen(8080);

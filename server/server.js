const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const users = [];

const addUser = function(user) {
  if (!users.find(u => u.id === user.id)) {
    users.push({ id: user.id, name: user.name });
  }
};

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    const msgObject = JSON.parse(msg);
    switch (msgObject.type) {
      case 'newUser':
        addUser(msgObject.user);
        break;
      case 'updateName':
        updateName(msgObject.user);
    }
  });
});

app.listen(8080);

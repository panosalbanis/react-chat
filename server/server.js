const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const users = [];

const sendUpdatedUserList = function(ws) {
  ws.send(JSON.stringify({type: 'users', users: users}));
};

const broadcast = function(msg) {
  users.map(u => u.ws.send(msg))
}

const addUser = function(user, ws) {
  if (!users.find(u => u.id === user.id)) {
    users.push({ id: user.id, name: user.name, connection: ws });
  }
};

const removeUser = function(id) {
  if (!users.find(u => u.id === id)) {
    users.reduce((acc, cur) => cur.id === id ? acc : acc.push(cur), [])
  }
};

const updateUserName = function(user) {
  const oldUser = users.find(u => u.id === user.id)
  if (oldUser) {
    oldUser.name = user.name;
  }
};

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
    }
  });

  ws.on('close', function(event) {
    console.log(ws.id);
    removeUser(ws.id);
  })

});

app.listen(8080);

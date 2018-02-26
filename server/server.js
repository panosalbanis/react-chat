const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const uuidv4 = require('uuid/v4');

const users = [];

const addUser = function() {
  users.push({ id: uuidv4(), name: 'anonymous' });
};

app.use(function(req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next) {
  console.log('get route', req.testing);
  res.end();
});

app.ws('/users', function(ws, req) {
  console.log('open');
  addUser();
  ws.send(JSON.stringify(users));
  ws.on('message', function(msg) {
    console.log('message');
    console.log(msg);
  });
  console.log('socket', req.testing);
});

app.listen(8080);

class Chat {

  constructor() {
    this._users = [];
  }

  get users() {
    return this._users;
  }

  sendUpdatedUserList(ws) {
    this.broadcast(JSON.stringify({type: 'users', users: this._users}));
  }

  sendChatMsg(msg) {
    this.broadcast(msg);
  }

  broadcast(msg) {
    this._users.map(u => u.socket.send(msg))
  }

  addUser(user, ws) {
    if (!this.findUser(user.id)) {
      this._users.push({ id: user.id, name: user.name, socket: ws });
    }
  }

  removeUser(id) {
    if (this.findUser(id)) {
      this._users = this.users.reduce((acc, cur) => cur.id === id ? acc : acc.push(cur), [])
    }
  }

  updateUserName(user) {
    const oldUser = this.findUser(user.id)
    if (oldUser) {
      oldUser.name = user.name;
    }
  }

  findUser(id) {
    return this._users.find(u => u.id === id)
  }
}

const createChat = function() {
  return new Chat();
}

module.exports = {
  createChat
}

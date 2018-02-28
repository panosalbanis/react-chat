module.exports =  {

  users : [],

  getUsers : function() {
    return this.users;
  },

  sendUpdatedUserList : function(ws) {
    this.broadcast(JSON.stringify({type: 'users', users: users}));
  },

  sendChatMgs : function(msg) {
    this.broadcast(msg);
  },

  broadcast : function(msg) {
    this.users.map(u => u.socket.send(msg))
  },

  addUser : function(user, ws) {
    if (!this.findUser(user.id)) {
      this.users.push({ id: user.id, name: user.name, socket: ws });
    }
  },

  removeUser : function(id) {
    if (this.findUser(id)) {
      this.users = this.users.reduce((acc, cur) => cur.id === id ? acc : acc.push(cur), [])
    }
  },

  updateUserName : function(user) {
    const oldUser = this.findUser(user.id)
    if (oldUser) {
      oldUser.name = user.name;
    }
  },

  findUser : function(id) {
    return this.users.find(u => u.id === id)
  }
}

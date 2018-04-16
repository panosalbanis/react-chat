const assert = require('assert');
const Chat = require('./chat.js');

describe('Chat', function() {
  describe('addUser', function() {
    it('should add a new user', function() {
      const chat = Chat.createChat();
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users = chat.users;
      assert.equal(users.length, 1);
      assert.equal(users[0].name, 'test-user');
    });
    it('should not add duplicate users', function() {
      const chat = Chat.createChat();
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users = chat.users;
      assert.equal(users.length, 1);
      assert.equal(users[0].name, 'test-user');
    });
  });
  describe('removeUser', function() {
    it('should remove a user', function() {
      const chat = Chat.createChat();
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users1 = chat.users;
      assert.equal(users1.length, 1);
      chat.removeUser('id');
      const users2 = chat.users;
      assert.equal(users2.length, 0);
    });
    it('should not fail if a user does not exist', function() {
      const chat = Chat.createChat();
      chat.removeUser('id');
      const users = chat.users;
      assert.equal(users.length, 0);
    });
  });
  describe('findUser', function() {
    it('should find a user if they exist', function() {
      const chat = Chat.createChat();
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      assert.equal(chat.findUser('id').id, 'id');
    });
    it('should not fail if a user does not exist', function() {
      const chat = Chat.createChat();
      assert.equal(chat.findUser('test-user'), undefined)
    });
  });
});

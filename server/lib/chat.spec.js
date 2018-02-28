const assert = require('assert');
const chat = require('./chat.js');

describe('Chat', function() {
  describe('AddUser', function() {
    it('should add a new user', function() {
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users = chat.getUsers();
      assert.equal(users.length, 1);
      assert.equal(users[0].name, 'test-user');
    });
    it('should not add duplicate users', function() {
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users = chat.getUsers();
      assert.equal(users.length, 1);
      assert.equal(users[0].name, 'test-user');
    });
  });
  describe('removeUser', function() {
    it('should remove a user', function() {
      chat.addUser({id: 'id', name: 'test-user', connectin : null});
      const users1 = chat.getUsers();
      assert.equal(users1.length, 1);
      chat.removeUser('id');
      const users2 = chat.getUsers();
      assert.equal(users2.length, 0);
    });
    it('should not fail if a user does not exist', function() {
      chat.removeUser('id');
      const users = chat.getUsers();
      assert.equal(users.length, 0);
    });
  });
});

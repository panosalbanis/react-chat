import React, { Component } from 'react';
import uuid from 'js-uuid';
import './ChatWindow.css';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      users: []
    };
  }

  componentDidMount() {
    const localStore = window.localStorage;
    var user = JSON.parse(localStore.getItem('user'));
    if (!user) {
      user = { id: uuid.v4(), name: '' };
      localStore.setItem('user', JSON.stringify(user));
    }
    const userMsg = { type: 'newUser', user: { id: user.id, name: user.name } };
    const userMsgStr = JSON.stringify(userMsg);
    const socket = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.onopen = () => {
      socket.send(userMsgStr);
    };
    socket.onmessage = message => console.log(JSON.parse(message.data));
  }

  handleData(data) {
    console.log(data);
    let users = JSON.parse(data);
    this.setState({ users: users });
  }

  render() {
    return (
      <div>
        <div className="page-container">
          <div className="user-data-box">
            <p className="name-label">Your name</p>
            <input type="text" />
          </div>
          <div className="container-window">
            <div className="users-window" />
            <div className="chat-window" />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatWindow;

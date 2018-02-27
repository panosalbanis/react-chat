import React, { Component } from 'react';
import uuid from 'js-uuid';
import Users from './Users';
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
    this.setState({id: user.id});
    this.setState({name: user.name});
    const userMsg = { type: 'newUser', user: { id: user.id, name: user.name } };
    const userMsgStr = JSON.stringify(userMsg);

    this.socket = new WebSocket(`ws://${window.location.hostname}:8080`);
    this.socket.onopen = () => {
      this.socket.send(userMsgStr);
    };
    this.socket.onmessage = message => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'users':
          this.setState({users: data.users});
          break;
        default:
          console.log('unrecognised message type');
      }
    }
  }

  handleNameInput(e) {
    this.setState({name: e.target.value});
    const localStore = window.localStorage;
    localStore.setItem('user', JSON.stringify({id: this.state.id, name: e.target.value}));
    const nameUpdateMsg = { type: 'updateName', user: { id: this.state.id, name: e.target.value } };
    const nameUpdateMsgStr = JSON.stringify(nameUpdateMsg);
    this.socket.send(nameUpdateMsgStr);
  }

  render() {
    return (
      <div>
        <div className="page-container">
          <div className="user-data-box">
            <p className="name-label">Your name</p>
            <input type="text" value={this.state.name} onChange={this.handleNameInput.bind(this)} />
          </div>
          <div className="container-window">
            <Users users={this.state.users} />
            <div className="chat-window" />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatWindow;

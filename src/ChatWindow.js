import React, { Component } from 'react';
import './ChatWindow.css';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: 'panos',
      users: []
    };
  }

  handleData(data) {
    console.log(data)
    let users = JSON.parse(data);
    this.setState({users: users});
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
            <div className="users-window">
            </div>
            <div className="chat-window">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
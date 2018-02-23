import React, { Component } from "react";
import "./ChatWindow.css";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: "panos",
      users: []
    };
  }

  componentDidMount() {
    const socket = new WebSocket(`ws://${window.location.hostname}:8080/users`);
    socket.onopen = () => console.log("connected");
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

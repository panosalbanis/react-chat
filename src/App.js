import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to react-chat</h1>
        </header>
        <ChatWindow />
      </div>
    );
  }
}

export default App;
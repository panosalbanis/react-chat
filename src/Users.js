import React, { Component } from 'react';
import User from './User';
import './Users.css';

class Users extends Component {
  render() {
    return (
      this.props.users &&
      <div className="users-window">
        {this.props.users.map( u => {
          return <User key={u.id} user={u} />
        })}
      </div>
    )
  }
}

export default Users;

import React, { Component } from "react";
import * as api from "../../api/api";
import UserCard from "../cards/UserCard";
import PostUser from "../PostUser";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    const { users } = this.state;
    return (
      <div className="main-home">
        <div className="main-section-head">
          <h2 className="section-title">users</h2>
        </div>
        <div className="main-section-head">
          <div className="section-main">
            {users.map(user => (
              <div key={user.username}>
                <UserCard users={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    api.getUsers().then(({ data }) => this.setState({ users: data.users }));
  };
}

export default Users;

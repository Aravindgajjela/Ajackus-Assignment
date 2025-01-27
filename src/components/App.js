import React, { Component } from "react";
import UserList from "./UserList"; // Correct relative path to UserList

class App extends Component {
  render() {
    return (
      <div>
        <h1>User Management System</h1>
        <UserList />
      </div>
    );
  }
}

export default App;

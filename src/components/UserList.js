import React, { Component } from "react";
import UserForm from "./UserForm"; // Correct relative path to UserForm

class UserList extends Component {
  state = {
    users: [],
    error: null,
    showForm: false,
    selectedUser: null,
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }))
      .catch(() => this.setState({ error: "Failed to fetch users" }));
  }

  handleEdit = (user) => {
    this.setState({ showForm: true, selectedUser: user });
  };

  handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState({
          users: this.state.users.filter((user) => user.id !== id),
        });
      })
      .catch(() => this.setState({ error: "Failed to delete user" }));
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, selectedUser: null });
  };

  render() {
    const { users, error, showForm, selectedUser } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <h2>User List</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {showForm ? (
          <UserForm user={selectedUser} onClose={this.handleCloseForm} />
        ) : (
          <div>
            <button
              onClick={() => this.setState({ showForm: true })}
              style={{ marginBottom: "10px" }}
            >
              Add User
            </button>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                  <button onClick={() => this.handleEdit(user)}>Edit</button>
                  <button onClick={() => this.handleDelete(user.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default UserList;

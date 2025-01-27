import React, { Component } from "react";
import UserForm from "./UserForm";

class UserList extends Component {
  state = {
    users: [],
    error: null,
    showForm: false,
    selectedUser: null,
    currentPage: 1,
    usersPerPage: 5, // Number of users displayed per page
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  renderPagination() {
    const { users, currentPage, usersPerPage } = this.state;
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => this.handlePageChange(index + 1)}
            style={{
              marginRight: "5px",
              background: currentPage === index + 1 ? "blue" : "gray",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { users, error, showForm, selectedUser, currentPage, usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
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
            <ul style={{ listStyle: "none", padding: "0" }}>
              {currentUsers.map((user) => (
                <li
                  key={user.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <strong>{user.name}</strong> - {user.email}
                  </div>
                  <div>
                    <button onClick={() => this.handleEdit(user)} style={{ marginRight: "5px" }}>
                      Edit
                    </button>
                    <button onClick={() => this.handleDelete(user.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            {this.renderPagination()}
          </div>
        )}
      </div>
    );
  }
}

export default UserList;

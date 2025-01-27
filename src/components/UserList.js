import React, { Component } from "react";
import UserForm from "./UserForm";

class UserList extends Component {
  state = {
    users: [],
    error: null,
    showForm: false,
    selectedUser: null,
    currentPage: 1,
    usersPerPage: 5,
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const usersWithDepartments = data.map((user, index) => ({
          ...user,
          department: ["HR", "Engineering", "Finance", "Marketing", "Sales"][index % 5],
        }));
        this.setState({ users: usersWithDepartments });
      })
      .catch(() => this.setState({ error: "Failed to fetch users" }));
  }

  handleEdit = (user) => {
    this.setState({ showForm: true, selectedUser: user });
  };

  handleDelete = (id) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
    });
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name.split(" ")[0]}</td>
                    <td>{user.name.split(" ")[1] || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>
                      <button onClick={() => this.handleEdit(user)} style={{ marginRight: "5px" }}>
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.renderPagination()}
          </div>
        )}
      </div>
    );
  }
}

export default UserList;

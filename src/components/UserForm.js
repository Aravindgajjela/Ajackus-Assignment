import React, { Component } from "react";

class UserForm extends Component {
  state = {
    name: this.props.user ? this.props.user.name : "",
    email: this.props.user ? this.props.user.email : "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", this.state);
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { name, email } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{this.props.user ? "Edit User" : "Add User"}</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;

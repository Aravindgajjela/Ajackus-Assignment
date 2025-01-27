import React, { Component } from "react";

class UserForm extends Component {
  state = {
    name: this.props.user ? this.props.user.name : "",
    email: this.props.user ? this.props.user.email : "",
    errors: {}, // Store validation errors
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    const errors = {};
    const { name, email } = this.state;
    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email address.";
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    console.log("Form submitted:", this.state);
    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { name, email, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{ padding: "10px", maxWidth: "400px", margin: "auto" }}>
        <h3>{this.props.user ? "Edit User" : "Add User"}</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />
          {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            style={{ display: "block", width: "100%", marginBottom: "5px" }}
          />
          {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}
        </label>
        <button type="submit" style={{ marginRight: "10px" }}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;

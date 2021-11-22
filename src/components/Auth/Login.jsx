import React, { Component } from 'react';
import authService from '../../services/auth-service';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    authService.login(username, password).then((response) => {
      this.setState({ username: '', password: '' });
      this.props.setUser(response.data, true);
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
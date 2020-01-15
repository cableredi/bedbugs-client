import React, { Component } from "react";
import ValidationError from '../ValidationError/ValidationError';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      },
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updatePassword(password) {
    this.setState({
      password: { value: password, touched: true }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    console.log("Username: ", username.value);
    console.log("Password: ", password.value);
  }

  validateUsername() {
    const username = this.state.username.value.trim();

    if (username.length === 0) {
      return { error: true, message: "Username is required" };
    }

    return { error: false, message: '' };
  }

  validatePassword() {
    const password = this.state.password.value.trim();

    if (password.length === 0) {
      return { error: true, message: "Password is required" };
    }

    return { error: false, message: '' };
  }

  render() {
    let loginButtonDisabled = true;

    const usernameError = this.validateUsername();
    const passwordError = this.validatePassword();

    if (!usernameError.error || !passwordError.error) {
      loginButtonDisabled = false;
    }

    return (
      <section className='section-page'>
        <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
          <h2>Login</h2>
          <div className='form__fields'>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className="login-form__control"
                name="username"
                id="username"
                aria-label="Username"
                aria-required="true"
                onChange={(e, newValue) => this.setState({ username: newValue })}
              />
              {this.state.username.touched && <ValidationError message={usernameError} />}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className="login-form__control"
                name="password"
                id="password"
                aria-label="Password"
                aria-required="true"
                onChange={(e, newValue) => this.setState({ password: newValue })}
              />
              {this.state.password.touched && <ValidationError message={passwordError} />}
            </div>
          </div>
          <div className="form__button-group">
            <button type="reset" className="form__button" id="loginCancelButton">
              Cancel
            </button>

            <button
              type="submit"
              className="form__button"
              id='loginSubmitButton'
              disabled={loginButtonDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </section>
        );
      }
    }
export default LoginForm;
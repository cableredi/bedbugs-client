import React, { Component } from "react";
import ValidationError from "../ValidationError/ValidationError";

class RegistrationForm extends Component {
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
      repeatPassword: {
        value: "",
        touched: false
      },
      firstName: {
        value: "",
        touched: false
      },
      lastName: {
        value: "",
        touched: false
      },
    };
  }

  updateUsername(username) {
    this.setState({
      username: {
        value: username,
        touched: true
      }
    });
  };

  updatePassword(password) {
    this.setState({
      password: {
        value: password,
        touched: true
      }
    });
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({
      repeatPassword: {
        value: repeatPassword,
        touched: true
      }
    });
  }

  updateFirstName(firstName) {
    this.setState({
      firstName: {
        value: firstName,
        touched: true
      }
    });
  }

  updateLastName(lastName) {
    this.setState({
      lastName: {
        value: lastName,
        touched: true
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password, repeatPassword } = this.state;

    console.log("Username: ", username.value);
    console.log("Password: ", password.value);
    console.log("Repeat Password: ", repeatPassword.value);
  }

  validateUsername() {
    const username = this.state.username.value.trim();

    if (username.length === 0) {
      return { error: true, message: "Username is required" };
    } else if (username.length < 3) {
      return { error: true, message: "Username must be at least 3 characters long" };
    }

    return { error: false, message: '' };
  }

  validatePassword() {
    const password = this.state.password.value.trim();

    if (password.length === 0) {
      return { error: true, message: "Password is required" };
    } else if (password.length < 6 || password.length > 72) {
      return { error: true, message: "Password must be greater than 6 characters long" };
    } else if (!password.match(/[0-9]/)) {
      return { error: true, message: "Password must contain at least one number" };
    }

    return { error: false, message: '' };
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();

    if (repeatPassword !== password) {
      return { error: true, message: "Passwords do not match" };
    }

    return { error: false, message: '' };
  }

  validateFirstName() {
    const firstName = this.state.firstName.value.trim();

    if (firstName.length === 0) {
      return { error: true, message: "First Name is required" };
    } else if (firstName.length < 3) {
      return { error: true, message: "First name must be at least 3 characters long" };
    }

    return { error: false, message: '' };
  }

  validateLastName() {
    const lastName = this.state.lastName.value.trim();

    if (lastName.length === 0) {
      return { error: true, message: "Last Name is required" };
    } else if (lastName.length < 3) {
      return { error: true, message: "Last name must be at least 3 characters long" };
    }

    return { error: false, message: '' };
  }

  render() {
    let registrationButtonDisabled = true;

    const usernameError = this.validateUsername();
    const passwordError = this.validatePassword();
    const repeatPasswordError = this.validateRepeatPassword();
    const firstNameError = this.validateFirstName();
    const lastNameError = this.validateLastName();

    if (!usernameError.error || !passwordError.error || !repeatPasswordError.error || !firstNameError.error || !lastNameError.error) {
      registrationButtonDisabled = false;
    }

    return (
      <section className='section-page'>
        <form className="registration-form" onSubmit={e => this.handleSubmit(e)}>
          <h2>Register</h2>

          <div className='form__fields'>
            <div className="form__error">* required fields</div>
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                className="registration-form__control"
                name="username"
                id="username"
                aria-label="New Username"
                aria-required="true"
                onChange={e => this.updateUsername(e.target.value)}
              />
              {this.state.username.touched && <ValidationError message={usernameError} />}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                className="registration-form__control"
                name="password"
                id="password"
                aria-label="New Password"
                aria-required="true"
                onChange={e => this.updatePassword(e.target.value)}
              />
              <div className="form__hint">
                6 to 72 characters, must include a number
              </div>
              {this.state.password.touched && (<ValidationError message={passwordError} />)}
            </div>

            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password *</label>
              <input
                type="password"
                className="registration-form__control"
                name="repeatPassword"
                id="repeatPassword"
                aria-label="Repeat Password"
                aria-required="true"
                onChange={e => this.updateRepeatPassword(e.target.value)}
              />
              {this.state.repeatPassword.touched && (<ValidationError message={repeatPasswordError} />)}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                className="registration-form__control"
                name="firstName"
                id="firstName"
                aria-label="New First Name"
                aria-required="true"
                onChange={e => this.updateFirstName(e.target.value)}
              />
              {this.state.firstName.touched && <ValidationError message={firstNameError} />}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                className="registration-form__control"
                name="lastName"
                id="lastName"
                aria-label="New Last name"
                aria-required="true"
                onChange={e => this.updateLastName(e.target.value)}
              />
              {this.state.lastName.touched && <ValidationError message={lastNameError} />}
            </div>
          </div>

          <div className="form__button-group">
            <button type="reset" className="form__button" id="registrationCancelButton">
              Cancel
            </button>

            <button
              type="submit"
              className="form__button"
              id='registrationSubmitButton'
              disabled={registrationButtonDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}
export default RegistrationForm;
import React, { Component } from 'react';
import BedbugsContext from '../../BedbugsContext';
import LoginForm from '../../Components/LoginForm/LoginForm';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import BugsApiService from '../../services/bugs-api-service';
import ApplicationsApiService from '../../services/applications-api-service';

export default class LoginPage extends Component {
  static contextType = BedbugsContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  state = {
    error: null,
  }

  handleLoginSuccess = () => {
    const { history } = this.props
   IdleService.setIdleCallback(this.logoutFromIdle)
   IdleService.registerIdleTimerResets()
   TokenService.queueCallbackBeforeExpiry(() => {
     /* the timoue will call this callback just before the token expires */
     AuthApiService.postRefreshToken()
   })
    
    //Get all applications and bugs from DB and update state
    const applicationsRequest = ApplicationsApiService.getAll();
    const bugsRequest = BugsApiService.getAll();

    Promise.all([applicationsRequest, bugsRequest])
      .then((values) => {
        this.context.setApplications(values[0])
        this.context.setBugs(values[1])

        history.push('/applications');
      })
      .catch(error => this.setState({error: error.message}));
  }

  render() {
    return (
      <section className='section-page'>
        <h2>Login</h2>

        {this.state.error && <p className='error'>{this.state.error}</p>}

        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}
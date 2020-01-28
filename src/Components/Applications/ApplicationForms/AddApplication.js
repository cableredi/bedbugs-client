import React, { Component } from "react";
import BedbugsContext from '../../../BedbugsContext';
import ValidateError from '../../ValidateError/ValidateError';
import config from '../../../config';
const { isWebUri } = require('valid-url');

const Required = () => (
  <span className='form__required'>*</span>
);

export default class AddApplication extends Component {
  static contextType = BedbugsContext;

  constructor(props) {
    super(props);
    this.state = {
      application_name: {
        value: '',
        touched: false
      },
      application_url: {
        value: '',
        touched: false
      },
      repository_prod: {
        value: '',
        touched: false
      },
      repository_test: {
        value: '',
        touched: false
      },
      database_prod: {
        value: '',
        touched: false
      },
      database_test: {
        value: '',
        touched: false
      },
    }
  }

  /* Update Form State */
  updateApplicationName(application_name) {
    this.setState({
      application_name: {
        value: application_name,
        touched: true
      }
    })
  }

  updateApplicationURL(application_url) {
    this.setState({
      application_url: {
        value: application_url,
        touched: true
      }
    })
  }

  updateRepositoryProd(repository_prod) {
    this.setState({
      repository_prod: {
        value: repository_prod,
        touched: true
      }
    })
  }

  updateRepositoryTest(repository_test) {
    this.setState({
      repository_test: {
        value: repository_test,
        touched: true
      }
    })
  }

  updateDatabaseProd(database_prod) {
    this.setState({
      database_prod: {
        value: database_prod,
        touched: true
      }
    })
  }

  updateDatabaseTest(database_test) {
    this.setState({
      database_test: {
        value: database_test,
        touched: true
      }
    })
  }

  /* update Database on Submit */
  handleSubmit = e => {
    e.preventDefault();

    //put fields in object
    const application = {
      application_name: this.state.application_name.value,
      application_url: this.state.application_url.value,
      repository_prod: this.state.repository_prod.value,
      repository_test: this.state.repository_test.value,
      database_prod: this.state.database_prod.value,
      database_test: this.state.database_test.value,
    };

    // update database, state, and go back to applications list
    fetch(config.API_ENDPOINT_APPLICATIONS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(application)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then((data) => {
        this.context.addApplication(data);
        this.props.history.push('/applications');
      })
      .catch(error => this.setState({ error }))
  }

  handleClickCancel = () => {
    this.props.history.push('/applications')
  };

  validateApplicationName() {
    const applicationName = this.state.application_name.value.trim();

    if (applicationName.length === 0) {
      return { error: true, message: 'Application Name is Required' }
    } else if (applicationName.length < 3 || applicationName.length > 40) {
      return { error: true, message: 'Application Name must be between 3 and 40 characters' };
    }

    return { error: false, message: '' }
  }

  validateApplicationURL() {
    const applicationURL = this.state.application_url.value.trim();

    if (applicationURL.length === 0) {
      return { error: true, message: 'Application URL is Required' }
    } else if (!isWebUri(applicationURL)) {
      return { error: true, message: 'Application URL must be a valid URL' }
    }

    return { error: false, message: '' }
  }

  render() {
    let applicationButtonDisabled = true;

    const ApplicationNameError = this.validateApplicationName();
    const ApplicationURLError = this.validateApplicationURL();

    if (!ApplicationNameError.error && !ApplicationURLError.error) {
      applicationButtonDisabled = false;
    }

    return (
      <section className='section-page'>
        <h1>Add Application</h1>
        <form
          className="Application__form"
          onSubmit={this.handleSubmit}
        >
          <div className="required">* Required Fields</div>
          
          <ul className="flex-outer">

            <li>
              <label htmlFor="application_name">
                Application Name:
                <Required />
              </label>
              <input
                type="text"
                name="application_name"
                id="application_name"
                placeholder="Application Name"
                maxLength="40"
                onChange={e => this.updateApplicationName(e.target.value)}
                required
              />
            </li>
            <li>{this.state.application_name.touched && <ValidateError message={ApplicationNameError.message} />}</li>

            <li>
              <label htmlFor="application_url">
                Application URL:
                <Required />
              </label>
              <input
                type="text"
                name="application_url"
                id="application_url"
                placeholder="Application URL"
                onChange={e => this.updateApplicationURL(e.target.value)}
                required
              />
            </li>
            <li>{this.state.application_url.touched && <ValidateError message={ApplicationURLError.message} />}</li>

            <li>
              <label htmlFor="repository_prod">
                Production Repository:
              </label>
              <input
                type="text"
                name="repository_prod"
                id="repository_prod"
                placeholder="Production Repository"
                onChange={e => this.updateRepositoryProd(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="repository_test">
                Test Repository:
              </label>
              <input
                type="text"
                name="repository_test"
                id="repository_test"
                placeholder="Test Repository"
                onChange={e => this.updateRepositoryTest(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="database_prod">
                Production Database:
              </label>
              <input
                type="text"
                name="database_prod"
                id="database_prod"
                placeholder="Production Database"
                onChange={e => this.updateDatabaseProd(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="database_test">
                Test Database:
              </label>
              <input
                type="text"
                name="database_test"
                id="database_test"
                placeholder="Test Database"
                onChange={e => this.updateDatabaseTest(e.target.value)}
              />
            </li>

            <li className="form__button-group">
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={applicationButtonDisabled}
              >
                Save
              </button>
            </li>
          </ul>
        </form>
      </section>
    )
  }
}

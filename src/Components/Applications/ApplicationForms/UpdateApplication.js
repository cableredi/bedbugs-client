import React, { Component } from 'react';
import BedbugsContext from '../../../BedbugsContext';
import ValidateError from './ValidateError';
const { isWebUri } = require('valid-url');

const Required = () => (
  <span className="form__required">*</span>
);

export default class UpdateApplication extends Component {
  static contextType = BedbugsContext;

  constructor(props) {
    super(props);
    this.state = {
      application_id: {
        value: '',
        touched: false
      },
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
  updateApplicationId(application_id) {
    this.setState({
      application_id: {
        value: application_id,
      }
    })
  }

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

  componentDidMount() {
  this.setState({
    application_id: { value:this.props.application.application_id },
    application_url: { value:this.props.application.application_url},
    application_name: { value:this.props.application.application_name},
    repository_prod: { value:this.props.application.repository_prod},
    repository_test: { value:this.props.application.repository_test},
    database_prod: { value:this.props.application.database_prod},
    database_test: { value:this.props.application.database_test},
  })
  }

  handleSubmit = e => {
    e.preventDefault();
    const application_id = this.state.application_id;

    const newApplication = {
      application_id: application_id,
      application_name: this.state.application_name.value,
      application_url: this.state.application_url.value,
      repository_prod: this.state.repository_prod.value,
      repository_test: this.state.repository_test.value,
      database_prod: this.state.database_prod.value,
      database_test: this.state.database_test.value,
    };

    this.resetFields(newApplication);
    this.context.updateApplication(newApplication);
    this.props.history.push('/applications');
  };

  resetFields = (newFields) => {
    this.setState({
      application_id: newFields.application_id || '',
      application_name: newFields.application_name || '',
      application_url: newFields.application_url || '',
      repository_prod: newFields.repository_prod || '',
      repository_test: newFields.repository_test || '',
      database_prod: newFields.database_prod || '',
      database_test: newFields.database_test || '',
    })
  };

  handleClickCancel = () => {
    this.props.history.push('/applications')
  };

  validateApplicationName() {
    const applicationName = this.state.application_name.value.trim();

    if (applicationName.length === 0) {
      return { error: true, message: 'Application Name is Required' }
    } else if (applicationName.length < 3) {
      return { error: true, message: 'Application Name must be at least 3 characters long' };
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

    if (!ApplicationNameError.error || !ApplicationURLError.error) {
      applicationButtonDisabled = false;
    }
    console.log('state', this.state)

    return (
      <section className='section-page'>
        <h1>Update Application</h1>

        <form
          className="AddApplication__form"
          onSubmit={this.handleSubmit}
        >
          <ul className="flex-outer">
            <li>
              <input type="hidden" name="application_id" value={this.state.application_id.value} />
            </li>

            <li>
              <label htmlFor="application_name">
                Application Name
                {' '}
                <Required />
              </label>
              <input
                type="text"
                name="application_name"
                id="application_name"
                placeholder="Application Name"
                value={this.state.application_name.value}
                onChange={e => this.updateApplicationName(e.target.value)}
                required
              />
              {this.state.application_name.touched && <ValidateError message={ApplicationNameError.message} />}
            </li>

            <li>
              <label htmlFor="application_url">
                Application URL
                {' '}
                <Required />
              </label>
              <input
                type="text"
                name="application_url"
                id="application_url"
                placeholder="Application URL"
                value={this.state.application_url.value}
                onChange={e => this.updateApplicationURL(e.target.value)}
                required
              />
              {this.state.application_url.touched && <ValidateError message={ApplicationURLError.message} />}
            </li>

            <li>
              <label htmlFor="repository_prod">
                Production Repository
              </label>
              <input
                type="text"
                name="repository_prod"
                id="repository_prod"
                placeholder="Production Repository"
                value={this.state.repository_prod.value}
                onChange={e => this.updateRepositoryProd(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="repository_test">
                Test Repository
              </label>
              <input
                type="text"
                name="repository_test"
                id="repository_test"
                placeholder="Test Repository"
                value={this.state.repository_test.value}
                onChange={e => this.updateRepositoryTest(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="database_prod">
                Production Database
              </label>
              <input
                type="text"
                name="database_prod"
                id="database_prod"
                placeholder="Production Database"
                value={this.state.database_prod.value}
                onChange={e => this.updateDatabaseProd(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="database_test">
                Test Database
              </label>
              <input
                type="text"
                name="database_test"
                id="database_test"
                placeholder="Test Database"
                value={this.state.database_test.value}
                onChange={e => this.updateDatabaseTest(e.target.value)}
              />
            </li>

            <li className="form__button-group">
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>
              {' '}
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
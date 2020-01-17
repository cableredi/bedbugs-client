import React, { Component } from 'react';
import BedbugsContext from '../../../BedbugsContext';

const Required = () => (
  <span className="form__required">*</span>
);

export default class UpdateApplication extends Component {
  static contextType = BedbugsContext;

  state = {
    error: null,
    application_id: '',
    application_name: '',
    application_url: '',
    repository_prod: '',
    repository_test: '',
    database_prod: '',
    database_test: '',
  }

  handleChangeApplicationName = e => {
    this.setState({ application_name: e.target.value })
  }

  handleChangeApplicationUrl = e => {
    this.setState({ application_url: e.target.value })
  }

  handleChangeRepositoryProd = e => {
    this.setState({ repository_prod: e.target.value })
  }

  handleChangeRepositoryTest = e => {
    this.setState({ repository_test: e.target.value })
  }

  handleChangeDatabaseProd = e => {
    this.setState({ database_prod: e.target.value })
  }

  handleChangeDatabaseTest = e => {
    this.setState({ database_test: e.target.value })
  }
  
  componentDidMount() {
    this.setState({ 
      application_id: this.props.application.application_id,
      application_name: this.props.application.application_name,
      application_url: this.props.application.application_url,
      repository_prod: this.props.application.repository_prod,
      repository_test: this.props.application.repository_test,
      database_prod: this.props.application.database_prod,
      database_test: this.props.application.database_test,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const application_id = this.state.application_id;
    
    const {
      application_name,
      application_url,
      repository_prod,
      repository_test,
      database_prod,
      database_test,
    } = this.state;

    const newApplication= {
      application_id,
      application_name,
      application_url,
      repository_prod,
      repository_test,
      database_prod,
      database_test,
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

  render() {
    return(
      <section className='section-page'>
        <h1>Update Application</h1>
        <form
          className="AddApplication__form"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="application_id" value={this.state.application_id} />

          <div className='form__error' role='alert'>
            {this.state.error && <p>{this.state.error.message}</p>}
          </div>

          <div>
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
              value={this.state.application_name}
              onChange={this.handleChangeApplicationName}
              required
            />
          </div>

          <div>
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
              value={this.state.application_url}
              onChange={this.handleChangeApplicationUrl}
              required
            />
          </div>

          <div>
            <label htmlFor="repository_prod">
              Production Repository
            </label>
            <input
              type="text"
              name="repository_prod"
              id="repository_prod"
              placeholder="Production Repository"
              value={this.state.repository_prod}
              onChange={this.handleChangeRepositoryProd}
            />
          </div>

          <div>
            <label htmlFor="repository_test">
              Test Repository
            </label>
            <input
              type="text"
              name="repository_test"
              id="repository_test"
              placeholder="Test Repository"
              value={this.state.repository_test}
              onChange={this.handleChangeRepositoryTest}
            />
          </div>

          <div>
            <label htmlFor="database_prod">
              Production Database
            </label>
            <input
              type="text"
              name="database_prod"
              id="database_prod"
              placeholder="Production Database"
              value={this.state.database_prod}
              onChange={this.handleChangeDatabaseProd}
            />
          </div>

          <div>
            <label htmlFor="database_test">
              Test Database
            </label>
            <input
              type="text"
              name="database_test"
              id="database_test"
              placeholder="Test Database"
              value={this.state.database_test}
              onChange={this.handleChangeDatabaseTest}
            />
          </div>

          <div className="form__button-group">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type="submit">
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}
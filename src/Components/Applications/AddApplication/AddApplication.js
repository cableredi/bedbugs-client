import React, { Component } from "react";
import BedbugsContext from '../../../BedbugsContext';

const Required = () => (
  <span className='form__required'>*</span>
);

export default class AddApplication extends Component {
  static contextType = BedbugsContext;

  state = {
    error: null,
  }

  handleSubmit = e => {
    e.preventDefault();

    //Get form fields
    const {
      application_id,
      application_name,
      application_url,
      repository_prod,
      repository_test,
      database_prod,
      database_test
    } = e.target;

    //put fields in object
    const application = {
      application_id: parseInt(application_id.value),
      application_name: application_name.value,
      application_url: application_url.value,
      repository_prod: repository_prod.value,
      repository_test: repository_test.value,
      database_prod: database_prod.value,
      database_test: database_test.value
    };

    this.setState({ error: null });

    // place holder to update database

    //reset fields
    application_id.value = undefined;
    application_name.value = '';
    application_url.value = '';
    repository_prod.value = '';
    repository_test.value = '';
    database_prod.value = '';
    database_test.value = '';

    //update state
    this.context.addApplication(application);

    //go back to applications
    this.props.history.push('/applications');
  }

  handleClickCancel = () => {
    this.props.history.push('/applications')
  };

  render() {
    const { error } = this.state;
    const newApplicationId = this.props.NewApplicationId;

    return(
      <section className='section-page'>
        <h1>Add Application</h1>
        <form
          className="AddApplication__form"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="application_id" value={newApplicationId} />

          <div className='form__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>

          <div>
            <label htmlFor="application_name">
              Application Name:
              <Required />
            </label>
            <input
              type="text"
              name="application_name"
              id="application_name"
              placeholder="Application Name"
              required
            />
          </div>

          <div>
            <label htmlFor="application_url">
              Application URL:
              <Required />
            </label>
            <input
              type="text"
              name="application_url"
              id="application_url"
              placeholder="Application URL"
              required
            />
          </div>

          <div>
            <label htmlFor="repository_prod">
              Production Repository:
            </label>
            <input
              type="text"
              name="repository_prod"
              id="repository_prod"
              placeholder="Production Repository"
            />
          </div>

          <div>
            <label htmlFor="repository_test">
              Test Repository:
            </label>
            <input
              type="text"
              name="repository_test"
              id="repository_test"
              placeholder="Test Repository"
            />
          </div>

          <div>
            <label htmlFor="database_prod">
              Production Database:
            </label>
            <input
              type="text"
              name="database_prod"
              id="database_prod"
              placeholder="Production Database"
            />
          </div>

          <div>
            <label htmlFor="database_test">
              Test Database:
            </label>
            <input
              type="text"
              name="database_test"
              id="database_test"
              placeholder="Production Database"
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
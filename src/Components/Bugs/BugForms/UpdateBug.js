import React, { Component } from 'react';
import BedbugsContext from '../../../BedbugsContext';
import ValidateError from '../../ValidateError/ValidateError';
import PropTypes from 'prop-types';
import config from '../../../config';

const Required = () => (
  <span className="form__required">*</span>
);

export default class UpdateBug extends Component {
  static contextType = BedbugsContext;

  constructor(props) {
    super(props);
    this.state = {
      deleteError: {
        value: false,
        message: ''
      },
      bug_id: {
        value: '',
        touched: false
      },
      bug_name: {
        value: '',
        touched: false
      },
      application_id: {
        value: '',
        touched: false
      },
      ticket_number: {
        value: '',
        touched: false
      },
      priority: {
        value: '',
        touched: false
      },
      status: {
        value: '',
        touched: false
      },
      environment: {
        value: '',
        touched: false
      },
      notes: {
        value: '',
        touched: false
      },
      reported_by: {
        value: '',
        touched: false
      },
      reported_on: {
        value: '',
        touched: false
      },
      expected_result: {
        value: '',
        touched: false
      },
      actual_result: {
        value: '',
        touched: false
      },
      steps: {
        value: '',
        touched: false
      },
      developer: {
        value: '',
        touched: false
      },
      developer_notes: {
        value: '',
        touched: false
      },
      last_updated: {
        value: '',
        touched: false
      },
    }
  }

  /* Update Form State */
  updateBugName(bug_name) {
    this.setState({
      bug_name: {
        value: bug_name,
        touched: true
      }
    })
  }

  updateApplicationId(application_id) {
    this.setState({
      application_id: {
        value: parseInt(application_id),
        touched: true
      }
    })
  }

  updateTicketNumber(ticket_number) {
    this.setState({
      ticket_number: {
        value: ticket_number,
        touched: true
      }
    })
  }

  updatePriority(priority) {
    this.setState({
      priority: {
        value: priority,
        touched: true
      }
    })
  }

  updateStatus(status) {
    this.setState({
      status: {
        value: status,
        touched: true
      }
    })
  }

  updateEnvironment(environment) {
    this.setState({
      environment: {
        value: environment,
        touched: true
      }
    })
  }

  updateNotes(notes) {
    this.setState({
      notes: {
        value: notes,
        touched: true
      }
    })
  }

  updateReportedBy(reported_by) {
    this.setState({
      reported_by: {
        value: reported_by,
        touched: true
      }
    })
  }
  updateReportedOn(reported_on) {
    this.setState({
      reported_on: {
        value: reported_on,
        touched: true
      }
    })
  }
  updateExpectedResult(expected_result) {
    this.setState({
      expected_result: {
        value: expected_result,
        touched: true
      }
    })
  }
  updateActualResult(actual_result) {
    this.setState({
      actual_result: {
        value: actual_result,
        touched: true
      }
    })
  }
  updateSteps(steps) {
    this.setState({
      steps: {
        value: steps,
        touched: true
      }
    })
  }
  updateDeveloper(developer) {
    this.setState({
      developer: {
        value: developer,
        touched: true
      }
    })
  }

  updateDeveloperNotes(developer_notes) {
    this.setState({
      developer_notes: {
        value: developer_notes,
        touched: true
      }
    })
  }

  updateLastUpdated(last_updated) {
    this.setState({
      last_updated: {
        value: last_updated,
        touched: true
      }
    })
  }

  /* handle form Delete Button */
  handleDelete = e => {
    e.preventDefault();

    const { bug_id } = this.props.match.params

    fetch(config.API_ENDPOINT_BUGS + `/${bug_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw error
          })
        }
        this.props.history.push('/bugs')
        this.context.deleteBug(bug_id);
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount() {
    this.setState({
      bug_id: {
        value: this.props.bug.bug_id
      },
      bug_name: {
        value: this.props.bug.bug_name
      },
      application_id: {
        value: this.props.bug.application_id
      },
      ticket_number: {
        value: this.props.bug.ticket_number
      },
      priority: {
        value: this.props.bug.priority
      },
      status: {
        value: this.props.bug.status
      },
      environment: {
        value: this.props.bug.environment
      },
      notes: {
        value: this.props.bug.notes
      },
      reported_by: {
        value: this.props.bug.reported_by
      },
      reported_on: {
        value: this.props.bug.reported_on
      },
      expected_result: {
        value: this.props.bug.expected_result
      },
      actual_result: {
        value: this.props.bug.actual_result
      },
      steps: {
        value: this.props.bug.steps
      },
      developer: {
        value: this.props.bug.developer
      },
      developer_notes: {
        value: this.props.bug.developer_notes
      },
      last_updated: {
        value: this.props.bug.last_updated
      },
    })
  }

  /* handle submit */
  handleSubmit = e => {
    e.preventDefault();

    this.setState({ error: null })
    const { bug_id } = this.props.match.params

    const updatedBug = {
      bug_id: this.state.bug_id.value,
      bug_name: this.state.bug_name.value,
      application_id: this.state.application_id.value,
      ticket_number: this.state.ticket_number.value,
      priority: this.state.priority.value,
      status: this.state.status.value,
      environment: this.state.environment.value,
      notes: this.state.notes.value,
      reported_by: this.state.reported_by.value,
      reported_on: this.state.reported_on.value,
      expected_result: this.state.expected_result.value,
      actual_result: this.state.actual_result.value,
      steps: this.state.steps.value,
      developer: this.state.developer.value,
      developer_notes: this.state.developer_notes.value,
      last_updated: this.state.last_updated.value,
    };

    fetch(config.API_ENDPOINT_BUGS + `/${bug_id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedBug),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.updateBug(updatedBug);
        this.props.history.push('/bugs');
      })
      .catch(error => {
        console.error(error)
      })
  };

  /* handle form cancel button */
  handleClickCancel = () => {
    this.props.history.push('/bugs')
  };

  /* Form validation */
  validateBugName() {
    const bugName = this.state.bug_name.value.trim();

    if (bugName.length === 0) {
      return { error: true, message: 'Bug Name is Required' }
    } else if (bugName.length < 3 || bugName.length > 20) {
      return { error: true, message: 'Bug Name must be between 3 and 20 characters' };
    }

    return { error: false, message: '' }
  }

  validateApplication() {
    const applicationId = this.state.application_id.value;

    if (!applicationId) {
      return { error: true, message: 'Application is Required' }
    }

    return { error: false, message: '' }
  }

  validateTicketNumber() {
    const ticketNumber = this.state.ticket_number.value.trim();

    if (ticketNumber.length === 0) {
      return { error: true, message: 'Ticket Number is Required' }
    } else if (ticketNumber.length < 3 || ticketNumber.length > 10) {
      return { error: true, message: 'Ticket Number must be between 3 and 10 characters long' };
    }

    return { error: false, message: '' }
  }

  validatePriority() {
    const priority = this.state.priority.value.trim();

    if (priority.length === 0) {
      return { error: true, message: 'Priority is Required' }
    }
    return { error: false, message: '' }
  }

  validateStatus() {
    const status = this.state.status.value.trim();

    if (status.length === 0) {
      return { error: true, message: 'Status is Required' }
    }

    return { error: false, message: '' }
  }

  validateEnvironment() {
    const environment = this.state.environment.value.trim();

    if (environment.length === 0) {
      return { error: true, message: 'Environment is Required' }
    }

    return { error: false, message: '' }
  }

  /* Render page */
  render() {
    let bugButtonDisabled = true;

    const BugNameError = this.validateBugName();
    const ApplicationError = this.validateApplication();
    const TicketNumberError = this.validateTicketNumber();
    const PriorityError = this.validatePriority();
    const StatusError = this.validateStatus();
    const EnvironmentError = this.validateEnvironment();

    if (!BugNameError.error &&
      !ApplicationError.error &&
      !TicketNumberError.error &&
      !PriorityError.error &&
      !StatusError.error &&
      !EnvironmentError.error) {
        bugButtonDisabled = false;
    }

    const applicationOptions = this.props.applications.map((application, i) =>
      <option
        value={application.application_id}
        key={i}
      >
        {application.application_name}
      </option>
    );

    return (
      <section className='section-page'>
        <h1>Update Bug</h1>
        <form
          className="UpdateBug__form"
          onSubmit={this.handleSubmit}
        >
          <ul className="flex-outer">
            <li className='form__input-error' role='alert'>
              <div>* Required Fields</div>
            </li>
            <li>
              <input type="hidden" name="bug_id" value={this.state.bug_id} />
              {this.state.deleteError.value && <ValidateError message={this.state.deleteError.message} />}
            </li>

            <li>
              <label htmlFor="bug_name">
                Bug Name:
               <Required />
              </label>
              <input
                type="text"
                name="bug_name"
                id="bug_name"
                placeholder="Bug Name"
                value={this.state.bug_name.value || ''}
                onChange={e => this.updateBugName(e.target.value)}
                required
              />
              {this.state.bug_name.touched && <ValidateError message={BugNameError.message} />}
            </li>

            <li>
              <label htmlFor="application_id">
                Application:
               <Required />
              </label>
              <select
                id='application_id'
                name='application_id'
                className='formSelect'
                aria-label="Select an Application"
                aria-required="true"
                value={this.state.application_id.value || ''}
                onChange={e => this.updateApplicationId(e.target.value)}
              >
                <option value=''>Application... </option>
                {applicationOptions}
              </select>
              {this.state.application_id.touched && <ValidateError message={ApplicationError.message} />}
            </li>

            <li>
              <label htmlFor="ticket_number">
                Ticket Number:
                <Required />
              </label>
              <input
                type="text"
                name="ticket_number"
                id="ticket_number"
                placeholder="Ticket Number"
                value={this.state.ticket_number.value || ''}
                onChange={e => this.updateTicketNumber(e.target.value)}
                required
              />
              {this.state.ticket_number.touched && <ValidateError message={TicketNumberError.message} />}
            </li>

            <li>
              <label htmlFor="priority">
                Priority:
               <Required />
              </label>
              <select
                id='priority'
                name='priority'
                className='formSelect'
                aria-label="Select a Priority"
                aria-required="true"
                value={this.state.priority.value || ''}
                onChange={e => this.updatePriority(e.target.value)}
              >
                <option value="">Priority... </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {this.state.priority.touched && <ValidateError message={PriorityError.message} />}
            </li>

            <li>
              <label htmlFor="status">
                Status:
               <Required />
              </label>
              <select
                id='status'
                name='status'
                className='formSelect'
                aria-label="Select a Status"
                aria-required="true"
                value={this.state.status.value || ''}
                onChange={e => this.updateStatus(e.target.value)}
              >
                <option value="">Status... </option>
                <option value="Open">Open</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Closed">Closed</option>
              </select>
              {this.state.status.touched && <ValidateError message={StatusError.message} />}
            </li>

            <li>
              <label htmlFor="environment">
                Environment:
               <Required />
              </label>
              <select
                id='environment'
                name='environment'
                className='formSelect'
                aria-label="Select a Environment"
                aria-required="true"
                value={this.state.environment.value || ''}
                onChange={e => this.updateEnvironment(e.target.value)}
              >
                <option value="">Environment... </option>
                <option value="Test">Test</option>
                <option value="QA">QA</option>
                <option value="Pre-Production">Pre-Production</option>
                <option value="Production">Production</option>
              </select>
              {this.state.environment.touched && <ValidateError message={EnvironmentError.message} />}
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="notes">
                Notes:
              </label>
              <textarea
                name="notes"
                id="notes"
                value={this.state.notes.value || ''}
                onChange={e => this.updateNotes(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="reported_by">
                Reported By:
              </label>
              <input
                type="text"
                name="reported_by"
                id="reported_by"
                placeholder="Reported By"
                value={this.state.reported_by.value || ''}
                onChange={e => this.updateReportedBy(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="reported_on">
                Reported On:
              </label>
              <input
                type="text"
                name="reported_on"
                id="reported_on"
                value={new Date(this.state.reported_on.value).toLocaleDateString() || ''}
                onChange={e => this.updateReportedOn(e.target.value)}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="expected_result">
                Expected Result:
              </label>
              <textarea
                name="expected_result"
                id="expected_result"
                value={this.state.expected_result.value || ''}
                onChange={e => this.updateExpectedResult(e.target.value)}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="actual_result">
                Actual Result:
              </label>
              <textarea
                name="actual_result"
                id="actual_result"
                value={this.state.actual_result.value || ''}
                onChange={e => this.updateActualResult(e.target.value)}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="steps">
                Steps to Reproduce:
              </label>
              <textarea
                name="steps"
                id="steps"
                value={this.state.steps.value || ''}
                onChange={e => this.updateSteps(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="developer">
                Developer:
              </label>
              <input
                type="text"
                name="developer"
                id="developer"
                placeholder="Developer"
                value={this.state.developer.value || ''}
                onChange={e => this.updateDeveloper(e.target.value)}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="developer_notes">
                Developer Notes:
            </label>
              <textarea
                name="developer_notes"
                id="developer_notes"
                value={this.state.developer_notes.value || ''}
                onChange={e => this.updateDeveloperNotes(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="last_updated">
                Last Updated:
              </label>
              <input
                type="text"
                name="last_updated"
                id="last_updated"
                placeholder="Last Updated"
                value={new Date(this.state.last_updated.value).toLocaleDateString()}
                onChange={e => this.updateLastUpdated.value(e.target.value)}
                readOnly
              />
            </li>

            <li className="form__button-group">
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>
              {' '}
              <button
                type="submit"
                disabled={bugButtonDisabled}
              >
                Save
              </button>
              {' '}
              <button
                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(e) }}
              >
                Delete
              </button>
            </li>
          </ul>
        </form>
      </section>
    )
  }
}

UpdateBug.defaultProps = {
  bug: {},
  applications: [],
  steps: [],
}

UpdateBug.propTypes = {
  bug: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
}
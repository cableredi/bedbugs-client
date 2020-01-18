import React, { Component } from "react";
import BedbugsContext from '../../../BedbugsContext';
import ValidateError from '../../ValidateError/ValidateError';
import PropTypes from 'prop-types';

const Required = () => (
  <span className='form__required'>*</span>
);

export default class AddBug extends Component {
  static contextType = BedbugsContext;

  constructor(props) {
    super(props);
    this.state = {
      values: [{ steps_id: null, value: null }],
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
      developer: {
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

  updateReportedby(reported_by) {
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
  updateDeveloper(developer) {
    this.setState({
      developer: {
        value: developer,
        touched: true
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    //put fields in object
    const bug = {
      bug_id: this.props.NewBugId,
      bug_name: this.state.bug_name.value,
      application_id: this.state.application_id.value,
      ticket_number: this.state.ticket_number.value,
      priority: this.state.priority.value,
      status: this.state.status.value,
      environment: this.state.environment.value,
      notes: this.state.notes.value,
      reported_by: this.state.reported_by.value,
      reported_on: new Date(),
      expected_result: this.state.expected_result.value,
      actual_result: this.state.actual_result.value,
      developer: this.state.developer.value,
      last_updated: new Date(),
    };

    //get steps from state
    const bugSteps = this.state.values.map((step, i) => ({ 
      "steps_id": step.steps_id, 
      "bug_id": bug.bug_id, 
      "steps_number": i + 1, 
      "step": step.value 
    }))

    // place holder to update database

    //update state
    this.context.addBug(bug);
    this.context.addSteps(bugSteps)

    //go back to applications
    this.props.history.push('/bugs');
  }

  handleClickCancel = () => {
    this.props.history.push('/bugs')
  };

  handleStepChange = (index, e, stepId) => {
    let values = [...this.state.values];
    values[index].value = e.target.value;
    values[index].steps_id = stepId + index;
    this.setState({ values });
  }

  addStepClick() {
    this.setState(prevState => ({
      values: [...prevState.values, { value: null }]
    }))
  };

  removeStepClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  };

  validateBugName() {
    const bugName = this.state.bug_name.value.trim();

    if (bugName.length === 0) {
      return { error: true, message: 'Bug Name is Required' }
    } else if (bugName.length < 3) {
      return { error: true, message: 'Bug Name must be at least 3 characters long' };
    }

    return { error: false, message: '' }
  }

  validateApplication() {
    const applicationId = this.state.application_id.value;

    if (applicationId.length === 0) {
      return { error: true, message: 'Application is Required' }
    }

    return { error: false, message: '' }
  }

  validateTicketNumber() {
    const ticketNumber = this.state.ticket_number.value.trim();

    if (ticketNumber.length === 0) {
      return { error: true, message: 'Ticket Number is Required' }
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

  render() {
    let bugButtonDisabled = true;

    const BugNameError = this.validateBugName();
    const ApplicationError = this.validateApplication();
    const TicketNumberError = this.validateTicketNumber();
    const PriorityError = this.validatePriority();
    const StatusError = this.validateStatus();

    if (!BugNameError.error || 
      !ApplicationError.error|| 
      !TicketNumberError.error|| 
      !PriorityError.error|| 
      !StatusError.error) 
    {
      bugButtonDisabled = false;
    }

    const newBugId = this.props.NewBugId;
    const newStepsId = this.props.NewStepsId;

    const applicationOptions = this.props.applications.map((application, i) =>
      <option value={application.application_id} key={i}>
        {application.application_name}
      </option>
    );

    return (
      <section className='section-page'>
        <h1>Add Bug</h1>
        <form
          className="AddBug__form"
          onSubmit={this.handleSubmit}
        >
          <ul className="flex-outer">
            <li>
              <input type="hidden" name="bug_id" value={newBugId} />
              <input type="hidden" name="steps_id" value={newStepsId} />
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
              </label>
              <input
                type="text"
                name="environment"
                id="environment"
                placeholder="Environment"
                onChange={e => this.updateEnvironment(e.target.value)}
              />
            </li>

            <li className="AddBug__form-textarea">
              <label htmlFor="notes">
                Notes:
              </label>
              <textarea
                name="notes"
                id="notes"
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
                onChange={e => this.updateReportedby(e.target.value)}
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
                value={new Date().toLocaleDateString()}
                readOnly
              />
            </li>

            <li className="AddBug__form-textarea">
              <label htmlFor="expected_result">
                Expected Result:
              </label>
              <textarea
                name="expected_result"
                id="expected_result"
                onChange={e => this.updateExpectedResult(e.target.value)}
              />
            </li>

            <li className="AddBug__form-textarea">
              <label htmlFor="actual_result">
                Actual Result:
              </label>
              <textarea
                name="actual_result"
                id="actual_result"
                onChange={e => this.updateActualResult(e.target.value)}
              />
            </li>

            <li className="AddBug__form-steps">
              <label htmlFor="steps">
                Steps To Reproduce:
              </label>
              <button
                type="button"
                onClick={() => this.addStepClick()}
              >
                Add New Step
              </button>
              {this.state.values.map((el, i) => (
                <div key={i}>
                  <label htmlFor="steps">Step #{i + 1} </label>
                  <input
                    type="text"
                    name="steps"
                    value={el.value || ''}
                    onChange={e => this.handleStepChange(i, e, newStepsId)}
                  />
                  {' '}
                  <input
                    type="button"
                    value="X"
                    onClick={() => this.removeStepClick(i)}
                  />
                </div>
              ))}
            </li>

            <li>
              <label htmlFor="developer">
                Developer Assigned To:
              </label>
              <input
                type="text"
                name="developer"
                id="developer"
                placeholder="Developer"
                onChange={e => this.updateDeveloper(e.target.value)}
              />
            </li>

            <li className="form__button-group">
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={bugButtonDisabled}
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

AddBug.defaultProps = {
  NewBugId: '',
  NewStepsId: '',
  applications: [],
}

AddBug.propTypes = {
  NewBugId: PropTypes.number.isRequired,
  NewStepsId: PropTypes.number.isRequired,
  applications: PropTypes.array.isRequired
}
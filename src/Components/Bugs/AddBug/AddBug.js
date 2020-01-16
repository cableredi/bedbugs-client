import React, { Component } from "react";
import BedbugsContext from '../../../BedbugsContext';

const Required = () => (
  <span className='form__required'>*</span>
);

export default class AddBug extends Component {
  static contextType = BedbugsContext;

  state = {
    error: null,
    values: [{ steps_id: null, value: null }],
  }

  handleSubmit = e => {
    e.preventDefault();

    //Get form fields
    const {
      bug_id,
      bug_name,
      application_id,
      ticket_number,
      priority,
      status,
      environment,
      notes,
      reported_by,
      reported_on,
      expected_result,
      actual_result,
      developer
    } = e.target;

    //put fields in object
    const bug = {
      bug_id: parseInt(bug_id.value),
      bug_name: bug_name.value,
      application_id: parseInt(application_id.value),
      ticket_number: ticket_number.value,
      priority: priority.value,
      status: status.value,
      environment: environment.value,
      notes: notes.value,
      reported_by: reported_by.value,
      reported_on: reported_on.value,
      expected_result: expected_result.value,
      actual_result: actual_result.value,
      developer: developer.value,
      developer_notes: '',
      last_updated: '',
    };

    //get steps from form
    const bugSteps = this.state.values.map((step, i) =>
      ({ "steps_id": step.steps_id, "bug_id": bug.bug_id, "steps_number": i + 1, "step": step.value })
    )

    this.setState({ error: null });

    // place holder to update database

    //reset fields
    bug_id.value = undefined;
    bug_name.value = '';
    application_id.value = undefined;
    ticket_number.value = '';
    priority.value = '';
    status.value = '';
    environment.value = '';
    notes.value = '';
    reported_by.value = '';
    reported_on.value = new Date();
    expected_result.value = '';
    actual_result.value = '';
    developer.value = '';

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

  render() {
    const { error } = this.state;
    const newBugId = this.props.NewBugId;
    const newStepsId = this.props.NewStepsId;

    const applicationOptions = this.props.applications.map((application, i) =>
      <option value={application.application_id} key={i}>
        {application.application_name}
      </option>
    );

    return (
      <section className='section-page'>
        <h2>Add Bug</h2>
        <form
          className="AddBug__form"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="bug_id" value={newBugId} />
          <input type="hidden" name="steps_id" value={newStepsId} />

          <div className='form__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>

          <div>
            <label htmlFor="bug_name">
              Bug Name:
              <Required />
            </label>
            <input
              type="text"
              name="bug_name"
              id="bug_name"
              placeholder="Bug Name"
              required
            />
          </div>

          <div>
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
            >
              <option value=''>Application... </option>
              {applicationOptions}
            </select>
          </div>

          <div>
            <label htmlFor="ticket_number">
              Ticket Number:
              <Required />
            </label>
            <input
              type="text"
              name="ticket_number"
              id="ticket_number"
              placeholder="Ticket Number"
              required
            />
          </div>

          <div>
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
            >
              <option value="">Priority... </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
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
            >
              <option value="">Status... </option>
              <option value="Open">Open</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="environment">
              Environment:
            </label>
            <input
              type="text"
              name="environment"
              id="environment"
              placeholder="Environment"
            />
          </div>

          <div>
            <label htmlFor="notes">
              Notes:
            </label>
            <input
              type="text"
              name="notes"
              id="notes"
              placeholder="Notes"
            />
          </div>

          <div>
            <label htmlFor="reported_by">
              Reported By:
            </label>
            <input
              type="text"
              name="reported_by"
              id="reported_by"
              placeholder="Reported By"
            />
          </div>

          <div>
            <label htmlFor="reported_on">
              Reported On:
            </label>
            <input
              type="text"
              name="reported_on"
              id="reported_on"
              value={new Date()}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="expected_result">
              Expected Result:
            </label>
            <input
              type="text"
              name="expected_result"
              id="expected_result"
              placeholder="Expected Result"
            />
          </div>

          <div>
            <label htmlFor="actual_result">
              Actual Result:
            </label>
            <input
              type="text"
              name="actual_result"
              id="actual_result"
              placeholder="Actual Result"
            />
          </div>

          <div>
            <label htmlFor="steps">
              Steps To Reproduce:
            </label>
            <input
              type="button"
              value="Add New Step"
              onClick={() => this.addStepClick()}
            />
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
                  value="Remove"
                  onClick={() => this.removeStepClick(i)}
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="developer">
              Developer:
            </label>
            <input
              type="text"
              name="developer"
              id="developer"
              placeholder="Developer"
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
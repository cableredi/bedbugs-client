import React, { Component } from 'react';
import BedbugsContext from '../../../BedbugsContext';

const Required = () => (
  <span className="form__required">*</span>
);

export default class UpdateBug extends Component {
  static contextType = BedbugsContext;

  state = {
    error: null,
    bug_id: '',
    bug_name: '',
    application_id: '',
    ticket_number: '',
    priority: '',
    status: '',
    environment: '',
    notes: '',
    reported_by: '',
    reported_on: '',
    expected_result: '',
    actual_result: '',
    developer: '',
    developer_notes: '',
    last_updated: '',
    values: [{ steps_id: null, bug_id: null, steps_number: 0, step: '' }],
    newStepsId: null,
  }

  handleChangeBugName = e => {
    this.setState({ bug_name: e.target.value })
  }

  handleChangeApplicationId = e => {
    this.setState({ application_id: e.target.value })
  }

  handleChangeTicketNumber = e => {
    this.setState({ ticket_number: e.target.value })
  }

  handleChangePriority = e => {
    this.setState({ priority: e.target.value })
  }

  handleChangeStatus = e => {
    this.setState({ status: e.target.value })
  }

  handleChangeEnvironment = e => {
    this.setState({ environment: e.target.value })
  }

  handleChangeNote = e => {
    this.setState({ notes: e.target.value })
  }

  handleChangeReportedBy = e => {
    this.setState({ reported_by: e.target.value })
  }

  handleChangeReportedOn = e => {
    this.setState({ reported_on: e.target.value })
  }

  handleChangeExpectedResult = e => {
    this.setState({ expected_result: e.target.value })
  }

  handleChangeActualResult = e => {
    this.setState({ actual: e.target.value })
  }

  handleChangeDeveloper = e => {
    this.setState({ developer: e.target.value })
  }

  handleChangeDeveloperNotes = e => {
    this.setState({ developer_notes: e.target.value })
  }

  handleChangeLastUpdated = e => {
    this.setState({ last_updated: e.target.value })
  }

  componentDidMount() {
    this.setState({
      bug_id: this.props.bug.bug_id,
      bug_name: this.props.bug.bug_name,
      application_id: this.props.bug.application_id,
      ticket_number: this.props.bug.ticket_number,
      priority: this.props.bug.priority,
      status: this.props.bug.status,
      environment: this.props.bug.environment,
      notes: this.props.bug.notes,
      reported_by: this.props.bug.reported_by,
      reported_on: this.props.bug.reported_on,
      expected_result: this.props.bug.expected_result,
      actual_result: this.props.bug.actual_result,
      developer: this.props.bug.developer,
      developer_notes: this.props.bug.developer_notes,
      last_updated: this.props.bug.last_updated,
      values: this.props.steps,
      newStepsId: this.props.NewStepsId,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
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
      developer,
      developer_notes,
      last_updated,
    } = this.state;

    const updatedBug = {
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
      developer,
      developer_notes,
      last_updated,
    };

    //get steps from form
    const bugSteps = this.state.values.map((step, i) =>
      ({ "steps_id": step.steps_id, "bug_id": updatedBug.bug_id, "steps_number": i + 1, "step": step.step })
    )

    this.setState({ error: null });

    // place holder to update database

    this.resetFields(updatedBug);
    this.context.updateBug(updatedBug);
    this.context.updateSteps(bugSteps);
    this.props.history.push('/bugs');
  };

  resetFields = (newFields) => {
    this.setState({
      bug_id: newFields.bug_id || '',
      bug_name: newFields.bug_name || '',
      application_id: newFields.application_id || '',
      ticket_number: newFields.ticket_number || '',
      priority: newFields.priority || '',
      status: newFields.status || '',
      environment: newFields.environment || '',
      notes: newFields.notes || '',
      reported_by: newFields.reported_by || '',
      reported_on: newFields.reported_on || '',
      expected_result: newFields.expected_result || '',
      actual_result: newFields.actual_result || '',
      developer: newFields.developer || '',
      developer_notes: newFields.developer_notes || '',
      last_updated: newFields.last_updated || '',
    })
  };

  handleClickCancel = () => {
    this.props.history.push('/bugs')
  };

  handleStepChange = (stepsId, e) => {
    let values = [...this.state.values];
    let stepIndex = values.findIndex((step, i) => step.steps_id === stepsId)
    values[stepIndex].step = e.target.value;
    this.setState({ values });
  }

  addStepClick() {
    const stepNumber = Math.max.apply(Math, this.state.values.map(function (num) { return num.steps_number }));
    this.setState(prevState => ({
      values: [...prevState.values, {
        steps_id: this.state.newStepsId,
        bug_id: this.state.bug_id,
        steps_number: stepNumber + 1,
        step: ''
      }]
    }))
  };

  removeStepClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  };

  render() {
    const { error } = this.state;
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
            <li>
              <input type="hidden" name="bug_id" value={this.state.bug_id} />
              <div className='form__error' role='alert'>
                {error && <p>{error.message}</p>}
              </div>
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
                value={this.state.bug_name}
                onChange={this.handleChangeBugName}
                required
              />
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
                value={this.state.application_id}
                onChange={this.handleChangeBugName}
              >
                <option value=''>Application... </option>
                {applicationOptions}
              </select>
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
                value={this.state.ticket_number}
                onChange={this.handleChangeTicketNumber}
                required
              />
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
                value={this.state.priority}
                onChange={this.handleChangePriority}
              >
                <option value="">Priority... </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
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
                value={this.state.status}
                onChange={this.handleChangeStatus}
              >
                <option value="">Status... </option>
                <option value="Open">Open</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Closed">Closed</option>
              </select>
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
                value={this.state.environment}
                onChange={this.handleChangeEnvironment}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="notes">
                Notes:
              </label>
              <textarea
                name="notes"
                id="notes"
                value={this.state.notes}
                onChange={this.handleChangeNote}
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
                value={this.state.reported_by}
                onChange={this.handleChangeReportedBy}
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
                value={new Date(this.state.reported_on).toLocaleDateString()}
                onChange={this.handleChangeReportedOn}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="expected_result">
                Expected Result:
              </label>
              <textarea
                name="expected_result"
                id="expected_result"
                value={this.state.expected_result}
                onChange={this.handleChangeExpectedResult}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="actual_result">
                Actual Result:
              </label>
              <textarea
                name="actual_result"
                id="actual_result"
                value={this.state.actual_result}
                onChange={this.handleChangeActualResult}
              />
            </li>

            <li className="UpdateBug__form-steps">
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
                  <label htmlFor="steps">Step #{el.steps_number} </label>
                  <input
                    type="text"
                    name="steps"
                    value={el.step || ''}
                    onChange={e => this.handleStepChange(el.steps_id, e)}
                  />
                  <input
                    type="button"
                    value="Remove"
                    onClick={() => this.removeStepClick(i)}
                  />
                </div>
              ))}
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
                value={this.state.developer}
                onChange={this.handleChangeDeveloper}
              />
            </li>

            <li className="UpdateBug__form-textarea">
              <label htmlFor="developer_notes">
                Developer Notes:
            </label>
              <textarea
                name="developer_notes"
                id="developer_notes"
                value={this.state.developer_notes}
                onChange={this.handleChangeDeveloperNotes}
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
                value={new Date(this.state.last_updated).toLocaleDateString()}
                onChange={this.handleChangeLastUpdated}
                readOnly
              />
            </li>

            <li className="form__button-group">
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>
              {' '}
              <button type="submit">
                Save
              </button>
            </li>
          </ul>
        </form>
      </section>
    )
  }
}
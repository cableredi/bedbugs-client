import React, { Component } from 'react';

const Required = () => (
  <span className='form__required'>*</span>
);

export default class UpdateBugForm extends Component {
  state = {
    error: null,
    bug_id: this.props.bug.bug_id || undefined,
    application_id: this.props.bug.application_id || '',
    application_name: this.props.bug.application_name || '',
    application_url: this.props.application_url || '',
    bug_name: this.props.bug.bug_name || '',
    ticket_number: this.props.ticket_number || '',
    priority: this.props.priority || '',
    status: this.props.status || '',
    environment: this.props.environment || '',
    notes: this.props.notes || '',
    reported_by: this.props.reported_by || '',
    reported_on: this.props.reported_on || '',
    steps_to_reproduce: this.props.steps_to_reproduce || '',
    expected_result: this.props.expected_result || '',
    actual_result: this.props.actual_result || '',
    developer: this.props.developer || '',
    developer_notes: this.props.developer_notes || '',
    last_updated: this.props.last_updated || '',
  };

  handleChangeBugName = e => {
    this.setState({
      bug_name: e.target.value,
    })
  };

  handleChangeTicketNumber = e => {
    this.setState({
      ticket_number: e.target.value,
    })
  };

  handleChangePriority = e => {
    this.setState({
      priority: e.target.value,
    })
  };

  handleChangeStatus = e => {
    this.setState({
      status: e.target.value,
    })
  };

  handleChangeEnvionment = e => {
    this.setState({
      environment: e.target.value,
    })
  };

  handleChangeNotes = e => {
    this.setState({
      notes: e.target.value,
    })
  };

  handleChangeReportedBy = e => {
    this.setState({
      reported_by: e.target.value,
    })
  };

  handleChangeReportedOn = e => {
    this.setState({
      reported_on: e.target.value,
    })
  };

  handleChangeStepsToReproduce = e => {
    this.setState({
      steps_to_reproduce: e.target.value,
    })
  };

  handleChangeExpectedResult = e => {
    this.setState({
      expected_result: e.target.value,
    })
  };

  handleChangeActualResult = e => {
    this.setState({
      actual_result: e.target.value,
    })
  };

  handleChangeDeveloper = e => {
    this.setState({
      developer: e.target.value,
    })
  };

  handleChangeDeveloperNotes = e => {
    this.setState({
      developer_notes: e.target.value,
    })
  };

  handleChangeDeveloper = e => {
    this.setState({
      developer: e.target.value,
    })
  };

  handleChangeDeveloperNotes = e => {
    this.setState({
      developer_notes: e.target.value,
    })
  };


  handleSubmit = e => {
    e.preventDefault();
    const { bug_id,
      application_id,
      application_name,
      application_url,
      bug_name,
      ticket_number,
      priority,
      status,
      environment,
      notes,
      reported_by,
      reported_on,
      steps_to_reproduce,
      expected_result,
      actual_result,
      developer,
      developer_notes,
      last_updated,
    } = this.state;

    this.props.onSubmit(
      {
        bug_id,
        application_id,
        application_name,
        application_url,
        bug_name,
        ticket_number,
        priority,
        status,
        environment,
        notes,
        reported_by,
        reported_on,
        steps_to_reproduce,
        expected_result,
        actual_result,
        developer,
        developer_notes,
        last_updated,
      },
      this.resetFields
    )
  };

  resetFields = newFields => {
    this.setState({
      bug_id: this.props.bug.bug_id || undefined,
      application_id: this.props.bug.application_id || '',
      application_name: this.props.bug.application_name || '',
      application_url: this.props.application_url || '',
      bug_name: this.props.bug.bug_name || '',
      ticket_number: this.props.ticket_number || '',
      priority: this.props.priority || '',
      status: this.props.status || '',
      environment: this.props.environment || '',
      notes: this.props.notes || '',
      reported_by: this.props.reported_by || '',
      reported_on: this.props.reported_on || '',
      steps_to_reproduce: this.props.steps_to_reproduce || '',
      expected_result: this.props.expected_result || '',
      actual_result: this.props.actual_result || '',
      developer: this.props.developer || '',
      developer_notes: this.props.developer_notes || '',
      last_updated: this.props.last_updated || '',
    })
  };

  render() {
    console.log('bugForm');
    const { error, onCancel } = this.props;
    const { bug_id,
      application_id,
      application_name,
      application_url,
      bug_name,
      ticket_number,
      priority,
      status,
      environment,
      notes,
      reported_by,
      reported_on,
      steps_to_reproduce,
      expected_result,
      actual_result,
      developer,
      developer_notes,
      last_updated,
    } = this.state;

    return (
      <div className='form'>
        <form
          className='bug-form'
          onSubmit={this.handleSubmit}
        >
          <div className='form__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          {bug_id && (
            <input type='hidden' name='bug_id' value={bug_id} />
          )}
          {application_id && (
            <input type='hidden' name='application_id' value={application_id} />
          )}
          {application_name && (
            <input type='hidden' name='application_name' value={application_name} />
          )}
          {application_url && (
            <input type='hidden' name='application_url' value={application_url} />
          )}

          <div>
            <span className="bold">
              Application Name
            </span>
              {application_name}
          </div>

          <div>
            <label htmlFor="bug_name">
              Bug Name
              <Required />
            </label>
            <input
              placeholder='Application Name'
              type="text"
              name='bug_name'
              id='bug_name'
              value={bug_name}
              onChange={this.handleChangeBugName}
              required
            />
          </div>

          <div>
            <label htmlFor="ticket_number">
              Ticket Number
              <Required />
            </label>
            <input
              placeholder='Ticket Number'
              type="text"
              name='ticket_number'
              id='ticket_number'
              value={ticket_number}
              onChange={this.handleChangeTicketNumber}
              required
            />
          </div>

          <div>
            <label htmlFor="priority">
              Priority
              <Required />
            </label>
            <input
              placeholder='Priority'
              type="text"
              name='priority'
              id='priority'
              value={priority}
              onChange={this.handleChangePriority}
              required
            />
          </div>

          <div>
            <label htmlFor="status">
              Status
              <Required />
            </label>
            <input
              placeholder='Status'
              type="text"
              name='status'
              id='status'
              value={status}
              onChange={this.handleChangeStatus}
              required
            />
          </div>

          <div>
            <label htmlFor="environment">
              Environment
              <Required />
            </label>
            <input
              placeholder='Environment'
              type="text"
              name='environment'
              id='environment'
              value={environment}
              onChange={this.handleChangeEnvionment}
              required
            />
          </div>

          <div>
            <label htmlFor="notes">
              Notes
              <Required />
            </label>
            <input
              placeholder='Notes'
              type="text"
              name='notes'
              id='notes'
              value={notes}
              onChange={this.handleChangeNotes}
              required
            />
          </div>

          <div>
            <label htmlFor="reported_by">
              Reported By
              <Required />
            </label>
            <input
              placeholder='Reported By'
              type="text"
              name='reported_by'
              id='reported_by'
              value={reported_by}
              onChange={this.handleChangeReportedBy}
              required
            />
          </div>

          <div>
            <label htmlFor="reported_on">
              Reported On
              <Required />
            </label>
            <input
              placeholder='Reported on'
              type="text"
              name='reported_on'
              id='reported_on'
              value={reported_on}
              onChange={this.handleChangeReportedOn}
              required
            />
          </div>

          <div>
            <label htmlFor="steps_to_reproduce">
              Steps To Reproduce
              <Required />
            </label>
            <input
              placeholder='Steps To Reproduce'
              type="text"
              name='steps_to_reproduce'
              id='steps_to_reproduce'
              value={steps_to_reproduce}
              onChange={this.handleChangeStepsToReproduce}
              required
            />
          </div>

          <div>
            <label htmlFor="expected_result">
              Expected Result
              <Required />
            </label>
            <input
              placeholder='Expected Result'
              type="text"
              name='expected_result'
              id='expected_result'
              value={expected_result}
              onChange={this.handleChangeExpectedResult}
              required
            />
          </div>

          <div>
            <label htmlFor="actual_result">
              Actual Result
              <Required />
            </label>
            <input
              placeholder='Expected Result'
              type="text"
              name='actual_result'
              id='actual_result'
              value={actual_result}
              onChange={this.handleChangeActualResult}
              required
            />
          </div>

          <div>
            <label htmlFor="developer">
              Developer
              <Required />
            </label>
            <input
              placeholder='Developer'
              type="text"
              name='developer'
              id='developer'
              value={developer}
              onChange={this.handleChangeDeveloper}
              required
            />
          </div>

          <div>
            <label htmlFor="developer_notes">
              Developer Notes
              <Required />
            </label>
            <input
              placeholder='Developer Notes'
              type="text"
              name='developer_notes'
              id='developer_notes'
              value={developer_notes}
              onChange={this.handleChangeDeveloperNotes}
              required
            />
          </div>

          <div>
            <label htmlFor="last_updated">
              Last Updated
            </label>
            <input
              placeholder='Developer Notes'
              type="text"
              name='last_updated'
              id='last_updated'
              value={new Date()}
              readOnly
            />
          </div>

          <div className='form__button-group'>
            <button type='button' onClick={onCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}
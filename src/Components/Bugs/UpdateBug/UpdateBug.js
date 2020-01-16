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
    last_updated: ''
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
    console.log('state', this.state);
    console.log('props', this.props);
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

    const newBug= {
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

    this.resetFields(newBug);
    this.context.updateBug(newBug);
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

  render() {
  console.log('update Bug state', this.props.bug)

  const applicationOptions = this.props.applications.map((application, i) =>
      <option value={application.application_id} key={i}>
        {application.application_name}
      </option>
    );
  
    return(
      <section className='section-page'>
        <h2>Update Bug</h2>
        <form
          className="AddBug__form"
          onSubmit={this.handleSubmit}
        >
          <input type="hidden" name="bug_id" value={this.state.bug_id} />

          <div>
            <label htmlFor="bug_name">
              Bug Name
              {' '}
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
          </div>

          <div>
            <label htmlFor="application_id">
              Application
              {' '}
              <Required />
            </label>
            <select
              id='application_id'
              name='application_id'
              className='formSelect'
              aria-label="Select an Application"
              aria-required="true"
              onChange={this.handleChangeBugName}
            >
              <option value=''>Application... </option>
              {applicationOptions}
            </select>
          </div>

          <div>
            <label htmlFor="ticket_number">
              Ticket Number
              {' '}
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
          </div>

          <div>
            <label htmlFor="priority">
              Priority
              {' '}
              <Required />
            </label>
            <select
              id='priority'
              name='priority'
              className='formSelect'
              aria-label="Select a Priority"
              aria-required="true"
              onChange={this.handleChangePriority}
            >
              <option value="">Priority... </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="status">
              Status
              {' '}
              <Required />
            </label>
            <select
              id='status'
              name='status'
              className='formSelect'
              aria-label="Select a Status"
              aria-required="true"
              onChange={this.handleChangeStatus}
            >
              <option value="">Status... </option>
              <option value="Open">Open</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="environment">
              Environment
              {' '}
            </label>
            <input
              type="text"
              name="environment"
              id="environment"
              placeholder="Environment"
              value={this.state.environment}
              onChange={this.handleChangeEnvironment}
            />
          </div>

          <div>
            <label htmlFor="notes">
              Notes
              {' '}
            </label>
            <input
              type="text"
              name="notes"
              id="notes"
              placeholder="Notes"
              value={this.state.notes}
              onChange={this.handleChangeNote}
            />
          </div>

          <div>
            <label htmlFor="reported_by">
              Reported By
              {' '}
            </label>
            <input
              type="text"
              name="reported_by"
              id="reported_by"
              placeholder="Reported By"
              value={this.state.reported_by}
              onChange={this.handleChangeReportedBy}
            />
          </div>

          <div>
            <label htmlFor="reported_on">
              Reported On
              {' '}
            </label>
            <input
              type="text"
              name="reported_on"
              id="reported_on"
              value={this.state.reported_on}
              onChange={this.handleChangeReportedOn}
            />
          </div>

          <div>
            <label htmlFor="expected_result">
              Expected Result
              {' '}
            </label>
            <input
              type="text"
              name="expected_result"
              id="expected_result"
              placeholder="Expected Result"
              value={this.state.expected_result}
              onChange={this.handleChangeExpectedResult}
            />
          </div>

          <div>
            <label htmlFor="actual_result">
              Actual Result
              {' '}
            </label>
            <input
              type="text"
              name="actual_result"
              id="actual_result"
              placeholder="Actual Result"
              value={this.state.actual_result}
              onChange={this.handleChangeActualResult}
            />
          </div>

          <div>
            <label htmlFor="steps">
              Steps To Reproduce
              {' '}
            </label>

          </div>

          <div>
            <label htmlFor="developer">
              Developer
              {' '}
            </label>
            <input
              type="text"
              name="developer"
              id="developer"
              placeholder="Developer"
              value={this.state.developer}
              onChange={this.handleChangeDeveloper}
            />
          </div>

          <div>
            <label htmlFor="developer_notes">
              Developer Notes
              {' '}
            </label>
            <input
              type="text"
              name="developer_notes"
              id="developer_notes"
              placeholder="Developer Notes"
              value={this.state.developer_notes}
              onChange={this.handleChangeDeveloperNotes}
            />
          </div>

          <div>
            <label htmlFor="last_updated">
              last Updated
              {' '}
            </label>
            <input
              type="text"
              name="last_updated"
              id="last_updated"
              placeholder="Last Updated"
              value={this.state.last_updated}
              onChange={this.handleChangeLastUpdated}
              readOnly
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
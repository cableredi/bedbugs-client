import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';

export default function BugsSummary(props) {
  const isActive = (path, match, location) => !!(match || path === location.pathname);
  const { bugs } = props;

  return (
    <>
      <div className="bugs-list__details">
        <NavLink
          className={'bugs-list__name'}
          to={`/updatebug/${bugs.bug_id}`}
          isActive={isActive.bind(this, `bug/${bugs.bug_id}`)}
        >
          {bugs.bug_name}
        </NavLink>
      </div>
      <div className="bugs-list__details">
        <div className="bugs-list__details-row">
          <div className="bold">Ticket # </div> {bugs.ticket_number}
          <div className="bold">Application: </div> {bugs.application_id}
          <div className="bold">Priority: </div> {bugs.priority}
          <div className="bold">Status: </div> {bugs.status}
        </div>
        <div className="bugs-list__details-row">
          <div className="bold">Reported By: </div> {bugs.reported_by}
          <div className="bold">Reported Date: </div> <Moment format="MM/DD/YYYY">{bugs.reported_on}</Moment>
          <div className="bold">Developer Assigned To: </div> {bugs.developer}
        </div>
      </div>
    </>
  )
}
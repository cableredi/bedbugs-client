import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BugsSummary(props) {
  console.log('Bugs Summary Page');

  const isActive = (path, match, location) => !!(match || path === location.pathname);
  const { bugs } = props;
  console.log('bugsSummary bug', bugs)

  return (
    <>
      <NavLink
        className={'bugs-list__name'}
        to={`/updatebug/${bugs.bug_id}`}
        isActive={isActive.bind(this, `bug/${bugs.bug_id}`)}
      >
        {bugs.bug_name}
      </NavLink>
      <div><span className="bold">Ticket # </span> {bugs.bug_ticket_number} </div>
      <div><span className="bold">Application: </span> {bugs.application_name} </div>
      <div><span className="bold">Priority: </span> {bugs.priority}</div>
      <div><span className="bold">Status: </span> {bugs.status}</div>
      <div><span className="bold">Reported By: </span> {bugs.reported_by}</div>
      <div><span className="bold">Reported Date: </span> {bugs.reported_on}</div>
      <div><span className="bold">Assigned To: </span> {bugs.developer}</div>
    </>
  )
}
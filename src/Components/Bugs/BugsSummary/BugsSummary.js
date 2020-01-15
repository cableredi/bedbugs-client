import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BugsSummary(props) {
  console.log('Bugs Summary Page');

  const isActive = (path, match, location) => !!(match || path === location.pathname);
  const { bugs } = props;
  console.log('bugsSummary bugs', bugs)


  const bugsItems = bugs.map((bug) =>
      <li key={bug.bug_id}>
        <NavLink
          className={'bugs-list__name'}
          to={`/bug/${bug.bug_id}`}
          isActive={isActive.bind(this, `bug/${bug.bug_id}`)}
        >
          <h4>{bug.bug_name}</h4>
        </NavLink>
        <div><span className="bold">Ticket # </span> {bug.bug_ticket_number} </div>
        <div><span className="bold">Application: </span> {bug.application_name} </div>
        <div><span className="bold">Priority: </span> {bug.priority}</div>
        <div><span className="bold">Status: </span> {bug.status}</div>
        <div><span className="bold">Reported By: </span> {bug.reported_by}</div>
        <div><span className="bold">Reported Date: </span> {bug.reported_on}</div>
        <div><span className="bold">Assigned To: </span> {bug.developer}</div>
      </li>
  );

  return (
    <>
      <ul>
        {bugsItems}
      </ul>
    </>
  )
}
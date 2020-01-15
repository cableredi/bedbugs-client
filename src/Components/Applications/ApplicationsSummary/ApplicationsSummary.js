import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ApplicationsSummary(props) {
  const { applications, bugs } = props;

  const isActive = (path, match, location) => !!(match || path === location.pathname);

  const getBugs = bugs.filter( (bug) => bug.application_id === applications.application_id);

  return (
    <>
      <NavLink
        className={'applications-list__name'}
        to={`/updateapplication/${applications.application_id}`}
        isActive={isActive.bind(this, `application/${applications.application_id}`)}
      >
        {applications.application_name}
      </NavLink>
      <div className="applications-list__counts">
        Open bugs: {
          getBugs
            .reduce((sum, { status }) => status === 'Open' ? sum + 1 : sum, 0)
        }
      </div>
      <div className="applications-list__counts">
        In-Progress bugs: {
          getBugs
            .reduce((sum, { status }) => status === 'In-Progress' ? sum + 1 : sum, 0)
        }
      </div>
      <div className="applications-list__counts">
        Closed bugs: {
          getBugs
            .reduce((sum, { status }) => status === 'Closed' ? sum + 1 : sum, 0)
        }
      </div>
    </>
  )
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import BugsSummary from '../BugsSummary/BugsSummary';
import PropTypes from 'prop-types';

export default function BugsList(props) {
  const { bugs } = props;

  const bugItems = bugs.map( (bug) =>
    <li key={bug.bug_id}>
      <BugsSummary bugs={bug} />
    </li>
  );

  return (
    <section className='section-page'>
      <h1>Bugs Summary</h1>
      <div className="bugs">
        <ul>
          {bugItems}
        </ul>
        <NavLink to='/addBug'>
          <div className="button">
            Add Bug
          </div>
        </NavLink>
      </div>
    </section>
  )
}

BugsList.defaultProps = {
  bugs: [],
}

BugsList.propTypes = {
  bugs: PropTypes.array.isRequired,
}
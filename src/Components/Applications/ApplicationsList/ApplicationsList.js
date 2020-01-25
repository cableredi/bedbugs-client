import React from 'react';
import { NavLink } from 'react-router-dom';
import ApplicationsSummary from '../ApplicationsSummary/ApplicationsSummary';
import PropTypes from 'prop-types';

export default function ApplicationsList(props) {
  const { applications, bugs } = props;

  const applicationItems = applications.map((appl) =>
    <li key={appl.application_id}>
      <ApplicationsSummary applications={appl} bugs={bugs} />
    </li>
  );

  return (
    <section className='section-page'>
      <h1>Applications Summary</h1>
      <div className="applications">
        <ul>
          {applicationItems}
        </ul>

        <NavLink to='/addApplication'>
          <div className="button">
            Add Application
          </div>
        </NavLink>
      </div>
    </section>
  )
}

ApplicationsList.defaultProps = {
  applications: [],
  bugs: [],
}

ApplicationsList.propTypes = {
  applications: PropTypes.array.isRequired,
  bugs: PropTypes.array.isRequired
}
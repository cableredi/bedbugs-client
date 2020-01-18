import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../AddButton/AddButton';
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
        <div className="button">
          <AddButton
            tag={Link}
            to='../addApplication'
            type='button'
          >
            Add Application
            </AddButton>
        </div>
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
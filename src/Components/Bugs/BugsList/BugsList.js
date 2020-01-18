import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../AddButton/AddButton';
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
        <div className="button">
          <AddButton
            tag={Link}
            to='../addbug'
            type='button'
          >
            Add Bug
            </AddButton>
        </div>
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
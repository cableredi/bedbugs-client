import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../AddButton/AddButton';
import BugsSummary from '../BugsSummary/BugsSummary';

export default function BugsList(props) {
  const { bugs } = props;
  console.log('bugs', bugs)

  return (
    <section className='section-page'>
      <h1>Bugs Summary</h1>
      <div className="applications">
        <ul>
          <BugsSummary bugs={bugs} />
        </ul>
        <div className="button">
          <AddButton
            tag={Link}
            to='../addBug'
            type='button'
          >
            Add Bug
            </AddButton>
        </div>
      </div>
    </section>
  )
}
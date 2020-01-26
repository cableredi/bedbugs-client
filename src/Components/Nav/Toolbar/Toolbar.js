import React from 'react'
import { NavLink } from 'react-router-dom';
import BedbugsLogo from '../../Images/bedbugs-logo.svg';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';


const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className='toolbar__toggle-button'>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>

      <div className="toolbar__logo">
        <NavLink to = '/'>
          <img src={BedbugsLogo} alt="Bedbugs logo" />
        </NavLink>
      </div>

      <div className="spacer" />

      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <NavLink to = '/applications'>
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink to = '/bugs'>
              Bugs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
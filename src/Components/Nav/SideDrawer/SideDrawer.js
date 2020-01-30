import React from 'react'

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';

  if (props.show) {
    drawerClasses = 'side-drawer open';
  };

  return (
    <nav className={drawerClasses}>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/applications'>Applications</a></li>
        <li><a href='/bugs'>Bugs</a></li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
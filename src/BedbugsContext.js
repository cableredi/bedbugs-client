import React from 'react';

const BedbugsContext = React.createContext({
  applications: [],
  addApplication: () => {},
  updateApplication: () => {},
  bugs: [],
  addBug: () => {},
  updateBug: () => {},
  steps: [],
  addSteps: () => {},
});

export default BedbugsContext;
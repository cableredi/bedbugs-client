import React from 'react';

const BedbugsContext = React.createContext({
  applications: [],
  setApplications: () => {},
  addApplication: () => {},
  updateApplication: () => {},
  bugs: [],
  setBugs: () => {},
  addBug: () => {},
  updateBug: () => {},
  addSteps: () => {},
  updateSteps: () => {},
});

export default BedbugsContext;
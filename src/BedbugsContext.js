import React from 'react';

const BedbugsContext = React.createContext({
  applications: [],
  addApplication: () => {},
  updateApplication: () => {},
  bugs: [],
  steps: [],
});

export default BedbugsContext;
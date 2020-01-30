import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BedbugsContext from '../../BedbugsContext';
import config from '../../config';

import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer'
import Backdrop from '../Nav/Backdrop/Backdrop';
import Landing from '../Landing/Landing';
import ApplicationsList from '../Applications/ApplicationsList/ApplicationsList';
import AddApplication from '../Applications/ApplicationForms/AddApplication';
import UpdateApplication from '../Applications/ApplicationForms/UpdateApplication';
import BugsList from '../Bugs/BugsList/BugsList';
import AddBug from '../Bugs/BugForms/AddBug';
import UpdateBug from '../Bugs/BugForms/UpdateBug';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      sideDrawerOpen: false,
      applications: [],
      bugs: [],
    }
  }

  /*********************/
  /*  State functions  */
  /*********************/
  setApplications = applications => {
    this.setState({
      applications,
    })
  }

  setBugs = bugs => {
    this.setState({
      bugs,
    })
  }

  addApplication = application => {
    this.setState({
      applications: [...this.state.applications, application]
    })
  }

  addBug = bug => {
    this.setState({
      bugs: [...this.state.bugs, bug]
    })
  }

  /*******************************/
  /* Sidebar nd backdrop toggles */
  /*******************************/
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  /*******************************************/
  /* get applications and bugs from database */
  /*******************************************/
  componentDidMount() {
    fetch(config.API_ENDPOINT_APPLICATIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(this.setApplications)
      .catch(error => this.setState({ error }))

    fetch(config.API_ENDPOINT_BUGS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(this.setBugs)
      .catch(error => this.setState({ error }))
  }

  /********************************/
  /* Update Applications to state */
  /********************************/
  updateApplication = updatedApplication => {
    this.setState({
      applications: this.state.applications.map(appl =>
        (appl.application_id !== updatedApplication.application_id) ? appl : updatedApplication
      )
    })
  }

  /************************/
  /* Update Bugs to state */
  /************************/
  updateBug = updatedBug => {
    this.setState({
      bugs: this.state.bugs.map(bug =>
        (bug.bug_id !== updatedBug.bug_id) ? bug : updatedBug
      )
    })
  }

  /*********************************/
  /* Update Application from state */
  /*********************************/
  deleteApplication = (application_id) => {
    const newApplications = this.state.applications.filter(application =>
      application.application_id !== Number(application_id)
    );
    this.setState({
      applications: newApplications
    });
  }

  /*************************/
  /* Update Bug from state */
  /*************************/
  deleteBug = (bug_id) => {
    const newBugs = this.state.bugs.filter(bug =>
      bug.bug_id !== Number(bug_id)
    );
    this.setState({
      bugs: newBugs
    });
  }

  render() {
    const contextValue = {
      applications: this.state.applications,
      addApplication: this.addApplication,
      updateApplication: this.updateApplication,
      deleteApplication: this.deleteApplication,
      bugs: this.state.bugs,
      addBug: this.addBug,
      updateBug: this.updateBug,
      deleteBug: this.deleteBug,
    };

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    };

    return (
      <div className="App">
        {/* Navigation */}
        <Route
          path="/"
          render={() =>
            <>
              <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
              <SideDrawer show={this.state.sideDrawerOpen} />
              {backdrop}
            </>
          }
        />
        <div className="sectionSpacer"></div>

        <BedbugsContext.Provider value={contextValue}>
          <Switch>
            {/* Landing Page */}
            <Route
              exact path='/'
              component={Landing}
            />

            {/* Applications Summary */}
            <Route
              exact path='/applications'
              render={(routeProps) =>
                <ApplicationsList
                  applications={this.state.applications}
                  bugs={this.state.bugs}
                  {...routeProps}
                />
              }
            />

            {/* Add an Application */}
            <Route
              exact path='/addapplication'
              component={(routeProps) =>
                <AddApplication
                  {...routeProps}
                />
              }
            />

            {/* Update an Application */}
            <Route
              exact path='/updateapplication/:application_id'
              component={(routeProps) =>
                <UpdateApplication
                  application={this.state.applications.find(application => application.application_id === Number(routeProps.match.params.application_id))}
                  bugs={this.state.bugs.filter(bug => bug.application_id === Number(routeProps.match.params.application_id))}
                  {...routeProps}
                />
              }
            />

            {/* Bugs Summary */}
            <Route
              exact path='/bugs'
              render={(routeProps) =>
                <BugsList
                  applications={this.state.applications}
                  bugs={this.state.bugs}
                  {...routeProps}
                />
              }
            />

            {/* Add a Bug */}
            <Route
              exact path='/addbug'
              component={(routeProps) =>
                <AddBug
                  applications={this.state.applications.map(appl => ({ application_id: appl.application_id, application_name: appl.application_name }))}
                  {...routeProps}
                />
              }
            />

            {/* Update a Bug */}
            <Route
              exact path='/updatebug/:bug_id'
              component={(routeProps) =>
                <UpdateBug
                  bug={this.state.bugs.find(bug => bug.bug_id === Number(routeProps.match.params.bug_id))}
                  applications={this.state.applications.map(appl => ({ application_id: appl.application_id, application_name: appl.application_name }))}
                  {...routeProps}
                />
              }
            />

            {/* Not Found Page */}
            <Route
              component={NotFoundPage}
            />

          </Switch>
        </BedbugsContext.Provider>
      </div>
    );
  }

}

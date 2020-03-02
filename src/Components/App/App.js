import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BedbugsContext from '../../BedbugsContext';

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
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import ApplicationsApiService from '../../services/applications-api-service';
import BugsApiService from '../../services/bugs-api-service';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import { PrivateRoute } from '../Helpers/PrivateRoute';
import PublicOnlyRoute from '../Helpers/PublicOnlyRoute';

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
  /* Sidebar and backdrop toggles */
  /*******************************/
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  /**************************************************/
  /* get applications and bugs from db if logged in */
  /**************************************************/
  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      //Get all applications and bugs from DB and update state
      const applicationsRequest = ApplicationsApiService.getAll();
      const bugsRequest = BugsApiService.getAll();
  
      Promise.all([applicationsRequest, bugsRequest])
        .then((values) => {
          this.setApplications(values[0])
          this.setBugs(values[1])
        })
        .catch(error => this.setState({ error }))
    }
  }

  /*******************************/
  /* ComponentWillUnmount        */
  /*******************************/
  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  /*************************/
  /* Logout if Idle        */
  /*************************/
  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /* clear out state */
    this.resetState({});
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
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
      setApplications: this.setApplications,
      addApplication: this.addApplication,
      updateApplication: this.updateApplication,
      deleteApplication: this.deleteApplication,
      bugs: this.state.bugs,
      setBugs: this.setBugs,
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

            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />

            <PublicOnlyRoute
              path={'/registration'}
              component={RegistrationPage}
            />

            {/* Applications Summary */}
            <PrivateRoute
              exact path='/applications'
              component={(routeProps) =>
                <ApplicationsList
                  applications={this.state.applications}
                  bugs={this.state.bugs}
                  {...routeProps}
                />
              }
            />

            {/* Add an Application */}
            <PrivateRoute
              exact path='/addapplication'
              component={(routeProps) =>
                <AddApplication
                  {...routeProps}
                />
              }
            />

            {/* Update an Application */}
            <PrivateRoute
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
            <PrivateRoute
              exact path='/bugs'
              component={(routeProps) =>
                <BugsList
                  applications={this.state.applications}
                  bugs={this.state.bugs}
                  {...routeProps}
                />
              }
            />

            {/* Add a Bug */}
            <PrivateRoute
              exact path='/addbug'
              component={(routeProps) =>
                <AddBug
                  applications={this.state.applications.map(appl => ({ application_id: appl.application_id, application_name: appl.application_name }))}
                  {...routeProps}
                />
              }
            />

            {/* Update a Bug */}
            <PrivateRoute
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

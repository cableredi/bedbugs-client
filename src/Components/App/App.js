import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BEDBUGS from '../../dummy-data';
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

function getNewApplicationId(applications) {
  return Math.max.apply(Math, applications.map(function (appl) { return parseInt(appl.application_id + 1) }))
}

function getNewBugId(bugs) {
  return Math.max.apply(Math, bugs.map(function (bug) { return parseInt(bug.bug_id + 1) }))
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      sideDrawerOpen: false,
      applications: BEDBUGS.applications,
      bugs: BEDBUGS.bugs,
    }
  }

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

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  /*
  componentDidMount() {
    getBedbugsApplications()
      .then(res => res.json())
      .then(data => {
        this.setApplications(data)
      })

    getBedbugsBugs()
      .then(res => res.json())
      .then(data => {
        this.setBugs(data)
      })

  }
  */

  updateApplication = updatedApplication => {
    this.setState({
      applications: this.state.applications.map(appl =>
        (appl.application_id !== updatedApplication.application_id) ? appl : updatedApplication
      )
    })
  }

  updateBug = updatedBug => {
    this.setState({
      bugs: this.state.bugs.map(bug =>
        (bug.bug_id !== updatedBug.bug_id) ? bug : updatedBug
      )
    })
  }

  deleteApplication = (application_id) => {
    const newApplications = this.state.applications.filter(application =>
      application.application_id !== application_id
    );
    this.setState({
      applications: newApplications
    });
  }

  deleteBug = (bug_id) => {
    const newBugs = this.state.bugs.filter(bug =>
      bug.bug_id !== bug_id
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

            <Route
              exact path='/'
              component={Landing}
            />

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

              <Route
                exact path='/addapplication'
                component={(routeProps) =>
                  <AddApplication
                    NewApplicationId={getNewApplicationId(this.state.applications)}
                    {...routeProps}
                  />
                }
              />

              <Route
                exact path='/updateapplication/:application_id'
                component={(routeProps) =>
                  <UpdateApplication
                    application={this.state.applications.find(appl => appl.application_id === Number(routeProps.match.params.application_id))}
                    bugs={this.state.bugs.filter(bug => bug.application_id === Number(routeProps.match.params.application_id))}
                    {...routeProps}
                  />
                }
              />

              <Route
                exact path='/bugs'
                render={(routeProps) =>
                  <BugsList
                    bugs={this.state.bugs}
                    {...routeProps}
                  />
                }
              />

              <Route
                exact path='/addbug'
                component={(routeProps) =>
                  <AddBug
                    NewBugId={getNewBugId(this.state.bugs)}
                    applications={this.state.applications.map(appl => ({ application_id: appl.application_id, application_name: appl.application_name }))}
                    {...routeProps}
                  />
                }
              />

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
            
            <Route
              component={NotFoundPage}
            />

          </Switch>
        </BedbugsContext.Provider>
      </div>
    );
  }

}

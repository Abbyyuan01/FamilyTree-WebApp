//app.js is the initial root file in any NodeJS project.

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store/store";
import PrivateRoute from "./components/private-route/PrivateRoute";
//import components
import Home from "./components/homepage/Home"
import Login from "./components/authentication/login.component";
import GenerateAccount from "./components/authentication/generate.component";
import ArtifactUpload from "./components/dashboard/artifacts/artifacts-upload.component";
import ArtifactView from "./components/dashboard/artifacts/artifacts-view.component";
import Timeline from "./components/dashboard/artifacts/artifacts-timeline.component";
import DashboardNav from "./components/dashboard/navbar/dashboardNav";
import ErrorBoundary from "./errorBoundary"
import UploadedArtifact from "./components/dashboard/artifacts/uploaded-artifact.component";
import DashNavBar from "./components/dashboard/navbar/dashBoardNavbar";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    console.log("log out")

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  /**
   * page router
   */
  render() {
    return (
      <ErrorBoundary>
      <Provider store={store}>
        <Router>
        <div>
          {/* <ScrollToTopWithRouter> */}
            <Switch>
                  <Route exact path="/" component={props => <Home {...props} />} />  
                  <Route exact path="/login" component={props => <Login {...props} />} />
                  <Route exact path="/register" component={props => <GenerateAccount {...props} />} />  
            </Switch>    
            <Switch>
              <PrivateRoute
                path="/dashboard"
                component={({ match: { path } }) => (
                  <DashNavBar>
                    <Route exact path={`${path}/`} component={props => <ArtifactView {...props} />}/>
                    <Route exact path={`${path}/upload`} component={props => <ArtifactUpload {...props} />} />
                    <Route path={`${path}/timeline`} component={props => <Timeline {...props} />} />
                    <Route path={`${path}/myArtifact`} component={props => <UploadedArtifact {...props} />} />
                  </DashNavBar>
                )}
  
              />
            </Switch>
          {/* </ScrollToTopWithRouter> */}
          </div>
        </Router>
      </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;

// class ScrollToTop extends React.Component {
//   componentDidUpdate(prevProps) {
//     if (this.props.location.pathname !== prevProps.location.pathname) {
//       window.scrollTo(0, 0);
//     }
//   }

//   render() {
//     return this.props.children;
//   }
// }

// const ScrollToTopWithRouter = withRouter(ScrollToTop);

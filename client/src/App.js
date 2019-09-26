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
import LandingPage from "./components/homepage/landingpage";
import AboutMe from "./components/homepage/aboutme";
import Contact from "./components/homepage/contact";
import ContactUs from "./components/homepage/contactus";
import Login from "./components/authentication/login.component";
import GenerateAccount from "./components/authentication/generate.component";
import ArtifactUpload from "./components/dashboard/artifacts/artifacts-upload.component";
import ArtifactView from "./components/dashboard/artifacts/artifacts-view.component";
import Timeline from "./components/dashboard/artifacts/artifacts-timeline.component";
import HomeNav from "./components/homepage/navbar/homeNav";
import DashboardNav from "./components/dashboard/navbar/dashboardNav";



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
      <Provider store={store}>
        <Router>
          <ScrollToTopWithRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/aboutme" component={AboutMe} />
              <Route exact path="/contactUs" component={ContactUs} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={GenerateAccount} />

              <Route
                path="/dashboard"
                render={({ match: { path } }) => (
                  <DashboardNav>
                    <Route exact path={`${path}/`} component={ArtifactView} />
                    <Route path={`${path}/upload`} component={ArtifactUpload} />
                    <Route path={`${path}/timeline`} component={Timeline} />
                  </DashboardNav>
                )}
              />
            </Switch>
          </ScrollToTopWithRouter>
        </Router>
      </Provider>
    );
  }
}

export default App;

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

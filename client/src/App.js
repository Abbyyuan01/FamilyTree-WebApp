import Login from './components/authentication/login.component'
import GenerateAccount from './components/authentication/generate.component'
import Navbar from './components/navbar/navbar.component'
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/private-route/PrivateRoute";

import "./App.css";

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
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* <Navbar /> */}
            {/* <Route exact path="/" component={Landing} /> */}
            <Route exact path="/register" component={GenerateAccount} />
            <Route exact path="/login" component={Login} />
            {/* <Switch>
              <PrivateRoute exact path="/navbar" component={Navbar} />
            </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

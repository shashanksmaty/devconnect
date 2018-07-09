import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';
import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import {logoutUser} from './actions/authAction';
import {clearProfile} from './actions/profileAction';
import './App.css';

// check for token
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.setAuthToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href('/login');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route path="/" component = { Landing } exact /> 
            <div className="container">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

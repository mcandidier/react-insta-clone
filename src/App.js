import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import { userLogin, userLogout,LOGIN } from './redux/auth/actions';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';


import{
  Nav,
  Post,
  PostModal,
  PostForm,
  Dashboard,
  Public,
  Login,
  Register,

} from './components';

import './App.css';


function App({user}) {
  useEffect( ()=> {
  }, [user])

  const {loggedIn}  = user;
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          {loggedIn ? <Dashboard/> : <Public />}
          </Route>
          <Route exact path="/login/">
            {loggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register/" component={Register} />
        </Switch>
      </Router>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {user}
}

export default connect(mapStateToProps, {
})(App);

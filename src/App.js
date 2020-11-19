import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import { userLogin, userLogout,LOGIN } from './redux/auth/actions';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
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


function App(props) {
  const {user} = props;

  const RootComponent = () => {
    if(user.loggedIn) {
      return <Dashboard></Dashboard>
    }else {
      return <Public></Public>
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={RootComponent} />
          <Route path="/login/" component={Login} />
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

export default connect(mapStateToProps, {})(App);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser} from './redux/auth/actions';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import{
  Nav,
  Dashboard,
  Public,
  Login,
  Register,
  Profile,
  Settings,
  PostDetail,
  ForgotPassword,
  ResetPassword,
} from './components';

import './App.css';


function App({user}) {
  useEffect( ()=> {
  }, [user])

  const {loggedIn}  = user;
  
  return (
    <div className="App">
      <Router>
        {loggedIn && <Nav></Nav> }
        <Switch>
          <Route exact path="/">
          {loggedIn ? <Dashboard/> : <Public />}
          </Route>
          <Route exact path="/login/">
            {loggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/forgot-password/">
            {loggedIn ? <Redirect to="/" /> : <ForgotPassword />}
          </Route>
          <Route path="/reset-password/:token/" component={ResetPassword} />
          <Route path="/register/" component={Register} />
          <Route path="/settings/" component={Settings} />
          <Route path="/p/:postId/" component={PostDetail}/>
          <Route path="/:username/" component={Profile}/>
        </Switch>
      </Router>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {user}
}

const mapDispatchToProps = (dispatch) => {
  dispatch(getCurrentUser());
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

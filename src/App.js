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
  Likes,
  NotFound,
} from './components';


import './App.css';



function App({user}) {
  const {loggedIn}  = user;


  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }

  
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
          <Route exact path="/reset-password/:token/" component={ResetPassword} />
          <Route exact path="/register/" component={Register} />
          <PrivateRoute path="/settings/" component={Settings} />
          <PrivateRoute exact path="/p/:postId/" component={PostDetail}/>
          <PrivateRoute exact path="/likes/" component={Likes}/>
          <PrivateRoute exact strict path="/:username/" component={Profile}/>
          <Route component={NotFound} />
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

import React from 'react';

import { connect } from 'react-redux';
import { Link, Redirect, useHistory} from 'react-router-dom';
import { Login } from '../components';


function Public(props) {
  const {user} = props;
  const history = useHistory();


  return (
    <div>
      <h1>Landing Page</h1>
      { user.loggedIn ? 
        <div>
          your'e logged in.
        </div>
        :
        <div>
          <Login></Login>
          <Link to="register">Register</Link>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {user}
}

export default connect(mapStateToProps, {

})(Public);

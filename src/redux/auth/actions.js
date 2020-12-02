import API from '../../api';

export const LOGIN = (token) => {
    return {
        type: 'LOGIN',
        payload: token
    }
}

export const SET_USER = (data) => {
  return {
      type: 'SET_USER',
      data
  }
}

export const handleLogin = (data, errorCallback) => {
    return (dispatch) => {
        return API.post('accounts/login/', data).then( resp => {
          dispatch(LOGIN(resp.data));
          dispatch(getCurrentUser());
        }, (err) => {
          errorCallback(err);
        });
    }
}

export const handleSignUp = (data) => {
  return (dispatch) => {
    return API.post('accounts/register/', data);
  }
}


export const getCurrentUser = () => {
  return (dispatch) => {
      return API.get('accounts/current/').then( resp => {
        dispatch(SET_USER(resp.data));
      });
  }
}

export const updateUserProfile = (data) => {
  return (dispatch) => {
    return API.put('accounts/profile/', data).then( resp => {
      dispatch(SET_USER(resp.data))
    });
    
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT'});
  }
}
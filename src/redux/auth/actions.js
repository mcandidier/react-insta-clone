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

export const handleLogin = (data, callback) => {
    return (dispatch) => {
        return API.post('accounts/login/', data).then( resp => {
          dispatch(LOGIN(resp.data));
          dispatch(SET_USER());
        });
    }
}

export const getCurrentUser = () => {
  return (dispatch) => {
      return API.get('accounts/current/').then( resp => {
        dispatch(SET_USER(resp.data));
      });
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT'});
  }
}
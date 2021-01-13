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

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({type: 'LOGOUT'});
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
      return API.get(`accounts/current/`).then( resp => {
        dispatch(SET_USER(resp.data));
      });
  }
}

export const getUserProfile = (username) => {
  return (dispatch) => {
    return API.get(`accounts/${username}/`).then(resp => {
      const {data} = resp;
      dispatch({type: 'VIEW_PROFILE', data});
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

export const handleRemoveProfilePhoto = () => {
  // Remove user profile photo
  return (dispatch) => {
    return API.delete('accounts/profile/').then( res => {
      dispatch({type: 'REMOVE_PHOTO'})
    });
  }
}

export const handleUpdateUserProfilePhoto = (data) => {
  return (dispatch) => {
    return API.post('accounts/profile/', data).then( res => {
      const data = res.data;
      dispatch({type: 'SET_PHOTO', data});
    });
  }
}

export const handleChangePassword = data => {
  return (dispatch) => {
    return API.post('accounts/change-password/', data);
  }
}

export const followUser = username => {
  // follow user base on username
  return (dispatch) => {
    return API.post(`accounts/${username}/`, {'action': 'follow'}).then( resp => {
      console.log(resp, 'follow');
    });
  }
}

export const unFollowUser = data => {
  return (dispatch) => {
    dispatch({type: 'UNFOLLOW_USER', data })
  }
}

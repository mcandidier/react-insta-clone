import omit from 'lodash/omit'; // load only functions you needed not entire library
import remove from 'lodash/remove';


const token = localStorage.getItem('access-token', null);

const INITIAL_STATE = {
  loggedIn: token ? true: false,
  token: token
}

export function user(state=INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('access-token', action.payload.token);
        const {token} = action.payload.token;
        return Object.assign({}, state, { loggedIn: true, token:token });
      case 'LOGOUT':
        localStorage.removeItem('access-token');
        return {};
      case 'SET_USER':
        action.data.loggedIn = true;
        return Object.assign({}, state, action.data); 
      case 'REMOVE_PHOTO':
        return omit(state, ['profile_photo'])
      case 'SET_PHOTO':
        return Object.assign({}, state, action.data)
      case 'UNFOLLOW_USER':
        remove(state.following, (userId) => {
          return userId === action.data;
        });
        return state;
      default:
        return state
    }
}


export function profile(state={}, action) {
  switch (action.type) {
    case 'VIEW_PROFILE':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
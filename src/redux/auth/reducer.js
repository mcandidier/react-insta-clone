const INITIAL_STATE = {
  loggedIn: false,
  token: null 
}

export default function user(state=INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN':
        return Object.assign({}, state, { loggedIn: true, token: action.token });
      case 'LOGOUT':
        return Object.assign({}, state, INITIAL_STATE);
      default:
        return state
    }
}
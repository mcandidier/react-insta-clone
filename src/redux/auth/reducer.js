const token = localStorage.getItem('access-token', null);

const INITIAL_STATE = {
  loggedIn: token ? true: false,
  token: token
}

export default function user(state=INITIAL_STATE, action) {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('access-token', action.payload.token);
        const {token} = action.payload.token;
        return Object.assign({}, state, { loggedIn: true, token:token });
      case 'LOGOUT':
        localStorage.removeItem('access-token');
        console.log('logout');
        return Object.assign({}, state, INITIAL_STATE);
      case 'SET_USER':
        return Object.assign({}, state, action.data);    
      default:
        return state
    }
}
export default function collections(state=[], action) {
  // user loggedin post collections
  switch (action.type) {
    case 'SET_COLLECTIONS':
      return action.posts
    default: 
      return state
  }
}
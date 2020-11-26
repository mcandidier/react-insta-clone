export const collections = (state=[], action) => {
  // user loggedin post collections
  switch (action.type) {
    case 'SET_COLLECTIONS':
      return action.posts
    default: 
      return state
  }
}


export const posts = (state=[], action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts
    case 'ADD_POST':
      return [action.post, ...state]
    default: 
      return state
  }
}


import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import {user, profile} from './auth/reducer';
import { collections, posts } from './posts/reducer';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form"
  user,
  profile,
  collections,
  posts,
})

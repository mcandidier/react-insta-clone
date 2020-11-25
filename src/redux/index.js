import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './auth/reducer';
import collections from './posts/reducer';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form"
  user,
  collections
})

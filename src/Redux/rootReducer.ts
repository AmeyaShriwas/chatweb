// reducers/index.ts or reducers/index.js

import { combineReducers } from 'redux';
import authenticationReducer from './Slices/AuthenticationSlice'; // Update this path according to your project structure

const rootReducer = combineReducers({
  auth: authenticationReducer,
  // add other reducers here if necessary
});

export default rootReducer;

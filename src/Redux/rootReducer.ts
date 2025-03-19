// reducers/index.ts or reducers/index.js

import { combineReducers } from 'redux';
import authenticationReducer from './Slices/AuthenticationSlice'; // Update this path according to your project structure
import chatReducer from './Slices/ChatSlice'

const rootReducer = combineReducers({
  auth: authenticationReducer,
  chat: chatReducer
  // add other reducers here if necessary
});

export default rootReducer;

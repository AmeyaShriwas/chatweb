// store.ts or store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Your root reducer

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;

// store.ts or store.js

import { configureStore } from '@reduxjs/toolkit';
import{persistStore, persistReducer} from 'redux-persist';
import rootReducer from './rootReducer'; // Your root reducer
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'chat']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=> 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;

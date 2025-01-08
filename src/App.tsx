import React, { useEffect } from 'react'
import AppNavigation from './Navigation/AppNavigation'
import { Provider, useSelector } from 'react-redux';
import store , {persistor} from './Redux/store'; // Make sure to import your store
import { PersistGate } from 'redux-persist/integration/react';
import { useNavigate } from 'react-router-dom';

const App = () => {
 
  return (
    <div>
      
       <Provider store={store}>
        <PersistGate persistor={persistor}>
      <AppNavigation/>
      </PersistGate>
      </Provider>
    </div>
  )
}

export default App

import React from 'react'
import AppNavigation from './Navigation/AppNavigation'
import { Provider } from 'react-redux';
import store from './Redux/store'; // Make sure to import your store

const App = () => {
  return (
    <div>
      
       <Provider store={store}>
      <AppNavigation/>
      </Provider>
    </div>
  )
}

export default App

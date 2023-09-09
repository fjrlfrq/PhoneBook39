import React from 'react';

import { Provider } from 'react-redux';
import User from './src/features/user/UserBox'

import store from './src/app/store'

function App() {
  <Provider store={store}>
    <User />
  </Provider>
}

export default App;

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persister, store} from './src/redux/store';
import AppNav from './AppNav';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['']);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <AppNav />
      </PersistGate>
    </Provider>
  );
};
export default App;

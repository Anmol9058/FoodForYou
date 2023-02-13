import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/Store';
import MainStack from './src/routes/MainStack';
import { NavigationRef } from './src/Services/Routerseervivces';
import { enableLatestRenderer } from 'react-native-maps';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  React.useEffect(() => {
    enableLatestRenderer();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={NavigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

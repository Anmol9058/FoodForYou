import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Container/LoginScreen';
import Home from '../Container/Home';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;

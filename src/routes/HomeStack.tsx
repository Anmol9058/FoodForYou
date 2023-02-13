import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Container/Home';
import MapScreen from '../Container/MapScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="BottomBar" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;

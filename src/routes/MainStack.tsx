import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';

import AuthStack from './AuthStack';
import CustomOpenSettings from '../Components/CustomOpenSettings';
import {Alert, Linking} from 'react-native';
import HomeStack from './HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import {setImagePermission, setInternet} from '../redux/common';

const Stack = createNativeStackNavigator();

const MainStack = () => {
     
  const isInternet = useSelector((state: any) => state.common.isInternet);
  const imagePermission = useSelector(
    (state: any) => state.common.imagePermission,
  );
  const userData = useSelector((state: any) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (isInternet !== offline) {
        dispatch(setInternet(offline));
      }
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <>
      {/* {isInternet ? <NoInternetConnection /> : null} */}

      <CustomOpenSettings
        visible={imagePermission}
        title="Permission"
        subtitle="Please give the permission to continue!"
        opensettings={() => {
          dispatch(setImagePermission(false));
          Linking.openSettings();
        }}
        close={() => {
          dispatch(setImagePermission(false));
        }}
      />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {userData ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
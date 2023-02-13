import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from '../Components/CustomStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../Components/InputText';
import { setDbData, setCurrentlongitude } from '../redux/home';
import { getScreenWidth, getScreenHeight } from '../utils/domUtil';
import fonts from '../constants/fonts';
import LoginButton from '../Components/LoginButton';
import useApi from '../hooks/UseApi';
import { loginManager, setOrientation } from '../redux/auth';
import { resturantManager } from '../redux/home';

import Geolocation from 'react-native-geolocation-service';
import _ from 'lodash';

const LoginScreen = ({ navigation }: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const orientation = useSelector((state: any) => state.auth.orientation);
  const aa = Dimensions.get('screen').width;
  const aa22 = Dimensions.get('screen').height;
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [screen, setScreen] = useState(false);

  const [permission, setPermission] = useState(false);
  const [email, setEmail] = useState('');
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const login = () => {
    dispatch<any>(resturantManager(apiCall));
    dispatch<any>(
      loginManager(apiCall, {
        username,
        password,
      })
    );
  };
  const action = _.debounce((text: string, delay: number, type: string) => {
    if (type === 'email') setEmail(text);

    if (type === 'password') setPassword(text);

    if (type === 'username') setUserName(text);
  }, 1000);
  const location = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = position;
          dispatch<any>(setDbData(location.coords.latitude));
          dispatch<any>(setCurrentlongitude(location.coords.longitude));
          setScreen(true);
          console.log(setDbData, 'kkkk');
        },
        async (error) => {
          if (Platform.OS === 'ios') {
            Alert.alert('Cant get Location, Make sure GPS is on.');
            console.log(error, 'hhh');
          } else if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
              title: 'Storage Permission',
              message: 'App needs access to your Location.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            });

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                (position) => {
                  const location = position;
                  dispatch<any>(setDbData(location.coords.latitude));
                  dispatch<any>(setCurrentlongitude(location.coords.longitude));
                  setScreen(true);
                },
                async (error) => {
                  console.log(error, 'annananna');
                }
              );
              setPermission(true);
            } else {
              setPermission(false);
            }
          }
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.log(err, 'errrr');
    }
  };

  useEffect(() => {
    location();
    dispatch<any>(setOrientation(aa >= aa22));
  }, []);

  console.log(orientation, 'gggg');

  return screen == false ? (
    <SafeAreaView style={{ flex: 1 }} />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar color={theme.primary} />

      <View style={{ backgroundColor: theme.white, flex: 1 }}>
        <View style={{ alignSelf: 'center', marginTop: orientation == false ? getScreenHeight(20) : 10 }}>
          <Image
            style={{
              width: orientation == false ? getScreenWidth(100) : getScreenWidth(40),
              height: orientation == false ? getScreenWidth(30) : getScreenWidth(15),
            }}
            source={require('../assets/food-for-you-logo.png')}
          />
        </View>
        <View
          style={{
            marginTop: getScreenHeight(5),
            alignItems: 'center',
            backgroundColor: theme.primary,
            marginHorizontal: orientation == false ? 20 : 200,
            paddingVertical: orientation == false ? 30 : 20,
            borderRadius: 5,
            elevation: 10,
          }}
        >
          <InputText
            label="username"
            hideLabel={true}
            onChangeText={(text) => action(text, 1000, 'username')}
            value={username}
            containerStyle={{
              width: orientation == false ? getScreenWidth(80) : getScreenWidth(40),
              height: orientation == false ? getScreenHeight(5) : getScreenHeight(9.5),
            }}
            placeholder={'Enter UserName'}
            // iconName={'email-outline'}
          />
          <Text style={{ fontWeight: 'bold' }}>{'username :kminchelle'}</Text>
          <InputText
            label="password"
            hideLabel={true}
            onChangeText={(text) => action(text, 1000, 'password')}
            value={password}
            // inputStyle={{ height: getScreenHeight(5) }}
            containerStyle={{
              width: orientation == false ? getScreenWidth(80) : getScreenWidth(40),
              height: orientation == false ? getScreenHeight(5) : getScreenHeight(9.5),
            }}
            placeholder={'Enter Password'}
          />
          <Text style={{ fontWeight: 'bold' }}>{'password:0lelplR'}</Text>

          <LoginButton
            title={'Submit'}
            onPress={login}
            // style={{ backgroundColor: 'blue', marginTop: getScreenHeight(1.5) }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

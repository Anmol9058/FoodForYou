import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from '../Components/CustomStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../Components/InputText';
import { getScreenWidth, getScreenHeight } from '../utils/domUtil';
import fonts from '../constants/fonts';
import LoginButton from '../Components/LoginButton';
import useApi from '../hooks/UseApi';
import { setDbData, setCurrentlongitude } from '../redux/home';
import Header from '../Components/Header';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { Alert } from 'react-native';

const MapScreen = ({ navigation, route }: any) => {
  console.log(route.params, 'route.params');
  const Maplatitude = 0;
  const MAplongitude = 0;
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dbData = useSelector((state: any) => state.home.dbData);
  const currentLongitude = useSelector((state: any) => state.home.currentLongitude);

  console.log(dbData, currentLongitude, 'fffffffffffffff');

  const [username, setUserName] = useState({
    focusedlocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const [coordinates] = useState([
    {
      latitude: 28.535517,
      longitude: 77.391029,
    },
    {
      latitude: 28.474388,
      longitude: 77.50399,
    },
  ]);
  const [locationStatus, setLocationStatus] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const [currentLongitude1, setCurrentLongitude] = useState<number>(78.3500869);
  const [currentLatitude1, setCurrentLatitude] = useState<number>(29.6092616);

  const [permission, setPermission] = useState(false);

  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const login = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = position;
          // Maplatitude=location.coords.latitude;
          dispatch<any>(setDbData(location.coords.latitude));
          dispatch<any>(setCurrentlongitude(location.coords.longitude));

          // dispatchsetDbData(location.coords.latitude);
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
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

                  //    console.log(location, 'kkkk');
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
    login();
    //     setCurrentLongitude(route.params.item.longitude);
    //     setCurrentLatitude(route.params.item.latitude);

    //     setCurrentLatitude2(route.params.item.latitude), setCurrentLongitude2(route.params.item.longitude);
  }, []);
  console.log(currentLongitude1, 'locationStatus');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar color={theme.black} />
      <Header title={'Map View'} onpress={() => navigation.goBack()} />
      <View style={{ backgroundColor: theme.white, flex: 1 }}>
        {/* <View style={{ marginTop: getScreenHeight(35), alignItems: 'center' }}> */}
        <View style={{ backgroundColor: 'black', flex: 1 }}>
          <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={{
              //     latitude: parseFloat(route.params.item.latitude),
              //     longitude: parseFloat(route.params.item.longitude),
              latitude: dbData,
              longitude: currentLongitude,
              //     latitude: 37.4220142,
              //     longitude: -122.0839904,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            zoomControlEnabled={true}
            followsUserLocation={true}
          >
            <Marker coordinate={{ latitude: parseFloat(route.params.item.latitude), longitude: parseFloat(route.params.item.longitude) }} />
            <Marker
              coordinate={{
                latitude: currentLatitude1,
                longitude: currentLongitude1,
              }}
            />
            {/* <Marker coordinate={coordinates[0]} /> */}
            <MapViewDirections
              destination={{ latitude: parseFloat(route.params.item.latitude), longitude: parseFloat(route.params.item.longitude) }}
              origin={{
                latitude: dbData,
                longitude: currentLongitude,
              }}
              apikey={'AIzaSyAwO8uDRERO-mHZfk8lHoBpf8pmp8zzesY'}
              strokeWidth={4}
              strokeColor="#111111"
            />
          </MapView>
        </View>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default MapScreen;

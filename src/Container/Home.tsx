import { View, Text, TextInput, Button, Image, FlatList, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from '../Components/CustomStatusBar';
import { useSelector, useDispatch } from 'react-redux';
import InputText from '../Components/InputText';
import { getScreenWidth, getScreenHeight } from '../utils/domUtil';
import fonts from '../constants/fonts';
import LoginButton from '../Components/LoginButton';
import useApi from '../hooks/UseApi';
import { openDatabase } from 'react-native-sqlite-storage';
import Header from '../Components/Header';
import { setOrientation } from '../redux/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ResturantCard from '../Components/ResturantCard';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

// const db = openDatabase({
//   name: 'rn_sqlite',
// });
var Datastore = require('react-native-local-mongodb');
const db = new Datastore({
  filename: 'asyncStorageKey',
  storage: AsyncStorage,
  autoload: true,
});

const Home = ({ navigation }: any) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const aa = Dimensions.get('screen').width;
  const aa22 = Dimensions.get('screen').height;
  const resturant = useSelector((state: any) => state.home.resturantData);
  const [realmdata, setRealmdata] = useState<any[]>([]);
  const dbDataLoaded = useSelector((state: any) => state.home.dbDataLoaded);
  const orientation = useSelector((state: any) => state.auth.orientation);

  const { apiCall } = useApi();
  const dispatch = useDispatch();

  const getdata = () => {
    db.loadDatabase(function () {
      // Callback is optional
      // Now commands will be executed
      let arr = db.find({}, function (err: any, docs: any) {
        setRealmdata(docs);
        return arr;
      });
    });
  };

  useEffect(() => {
    dispatch<any>(setOrientation(aa >= aa22));
    getdata();
  }, [dbDataLoaded]);
  console.log(orientation, 'ddreeeeeeed');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusBar color={theme.primary} />
      <Header title={'Resturant List'} />
      <View style={{ backgroundColor: theme.white, flex: 1 }}>
        <View style={{ alignItems: 'center' }}></View>
        {/* <Text>{realmdata[0].address}</Text> */}
        <FlatList
          // style={{ backgroundColor: 'pink' }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <ResturantCard item={item} onmapPress={() => navigation.navigate('MapScreen', { item })} />
            </View>
          )}
          // data={resturant.data}
          data={realmdata}
        />
        {/* <FlatList data={realmdata} renderItem={({ item }) => renderCategory(item)} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;

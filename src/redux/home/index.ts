import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import SimpleToast from 'react-native-simple-toast';
import { getResturant } from '../../api/home';
import { goBack, navigate } from '../../Services/Routerseervivces';
import _ from 'lodash';
var Datastore = require('react-native-local-mongodb');
const db = new Datastore({
  filename: 'asyncStorageKey',
  storage: AsyncStorage,
  autoload: true,
});
// const db = openDatabase({
//   name: 'rn_sqlite',
// });
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    resturantData: [],
    dbData: 0,
    currentLongitude: 0,
    dbDataLoaded: false,
  },
  reducers: {
    setResturantData(state, action) {
      state.resturantData = action.payload;
    },
    setDbData(state, action) {
      state.dbData = action.payload;
    },
    setCurrentlongitude(state, action) {
      state.currentLongitude = action.payload;
    },
    setDbDataLoaded(state, action) {
      state.dbDataLoaded = action.payload;
    },
  },
});

export const resturantManager = (apiCall: any) => {
  console.log('hii');

  return async (dispatch: any, getState: any) => {
    // const userData = getState().auth.userData;
    try {
      console.log('rrr');
      let url = `http://205.134.254.135/~mobile/interview/public/api/restaurants_list`;
      const res = await getResturant(apiCall, url);

      if (res) {
        // console.log(res, 'resturantdata1');
        dispatch(setResturantData(res));
        db.remove({}, { multi: true }, function (err: any, numRemoved: any) {
          res.data.forEach(async (dataObj: any, index: any) => {
            db.insert(dataObj, function (err: any, newDocs: any) {
              if (res.data.length == index + 1) {
                dispatch(setDbDataLoaded(true));
              }
            });
          });
        });

        // res.data.forEach(async (dataObj: any, index: any) => {
        //   db.insert(dataObj, function (err: any, newDocs: any) {
        //     console.log('afagaggagaga', newDocs);
        //     // dispatch(setResturantData(newDocs));
        //   });
        // });

        // console.log(res, 'resturantdata');
        // db.insert(res.data, function (err: any, newDocs: any) {
        //   // Two documents were inserted in the database
        //   // newDocs is an array with these documents, augmented with their _id
        // });
        // db.find({}, function (err: any, docs: any) {
        //   console.log(docs, 'docs');
        // });
        // dispatch(setResturantData(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const { setResturantData, setDbData, setCurrentlongitude, setDbDataLoaded } = homeSlice.actions;

export default homeSlice.reducer;

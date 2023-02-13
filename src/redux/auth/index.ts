import { createSlice } from '@reduxjs/toolkit';
import SimpleToast from 'react-native-simple-toast';
import { forgotPassword, login } from '../../api/auth';
import strings from '../../localization';
import { resturantManager } from '../home';
import { navigate } from '../../Services/Routerseervivces';
import { forgotPasswordSchema, loginSchema } from '../../utils/domUtil';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    token: null,
    orientation: false,
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setOrientation(state, action) {
      state.orientation = action.payload;
    },
    logout(state) {
      (state.userData = null), (state.token = null);
    },
  },
});

export const logoutManager = () => {
  return async (dispatch: any) => {
    dispatch(logout());
  };
};

export const loginManager = (apiCall: any, data: any) => {
  console.log(data, 'logindata');

  return async (dispatch: any) => {
    let result = loginSchema(data);
    console.log(result, 'reee');

    try {
      if (result) {
        let url = `https://dummyjson.com/auth/login`;
        const res = await login(apiCall, url, result);
        console.log(res, 'hhh');

        if (res) {
          dispatch(setUserData(res));
          // dispatch(resturantManager(apiCall));
          // dispatch(setToken({ access_token: res.sessionId }));
        } else {
          return SimpleToast.show(strings.invalidCredentials);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const forgotPasswordManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    let result = forgotPasswordSchema(data);
    try {
      if (result) {
        const res = await forgotPassword(apiCall, data);
        if (res) {
          if (res.message === 'A reset link has been sent to your Email id') {
            // navigate('EmailSent');
          }
          SimpleToast.show(res?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setUserData, setToken, logout, setOrientation } = authSlice.actions;

export default authSlice.reducer;

import Config from 'react-native-config';
import types from '../constants/types';

export const login = async (apiCall: any, url: any, data: any) => {
  const res = await apiCall({
    customUrl: true,
    type: types.post,
    url: url,
    data: data,
  });

  return res.data;
};

export const logOutApi = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: types.post,
    url: Config.LOGOUT,
    data: data,
  });
  return res.data;
};

export const forgotPassword = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: false,
    type: types.post,
    url: Config.FORGOT_PASSWORD,
    data: data,
  });
  return res.data;
};

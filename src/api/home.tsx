import Config from 'react-native-config';
import types from '../constants/types';

export const getResturant = async (apiCall: any, url: any) => {
  console.log('hhhhome', types.get, url);

  const res = await apiCall({
    customUrl: true,
    type: types.get,
    url: url,
  });
  //   console.log(res, 'hhhhhhhh');

  return res.data;
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncItem = async (key: any) => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res;
  } catch (error) {
    throw new Error('Something went wrong, Please try again later!');
  }
};

export const setAsyncItem = async (key: any, value: any) => {
  try {
    const res = await AsyncStorage.setItem(key, value);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong, Please try again later!');
  }
};

export const removeAsyncItem = async (key: any) => {
  try {
    const res = await AsyncStorage.removeItem(key);
    return res;
  } catch (error) {
    throw new Error('Something went wrong, Please try again later!');
  }
};

import { useCallback, useEffect } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../constants/api';
import { removeAsyncItem } from '../api/async';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, logout } from '../redux/auth';
import { setLoading } from '../redux/common';
import types from '../constants/types';

const getInstance = async ({ token, logOut, data, params, customUrl, url }: any) => {
  const instance = axios.create({
    // baseURL: customUrl ? url : '',
    baseURL: Config.BASE_URL,
  });

  instance.interceptors.request.use(
    (req: any) => {
      req.data = data;
      req.params = params;
      req.headers['Content-Type'] = 'application/json';
      if (token) {
        req.headers['Authorization'] = 'Bearer ' + token?.access_token;
      }
      return req;
    },
    (error) => {
      throw new Error(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      console.log(err, 'hhhh');

      const status = err.response?.status || 500;
      switch (status) {
        case 401: {
          logOut();
          removeAsyncItem('userData');
          throw new Error(err?.response?.data[0]?.message);
        }

        // forbidden (permission related issues)
        case 403: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // bad request
        case 400: {
          throw new Error('Invalid Credential');
        }

        // not found
        case 404: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // conflict
        case 409: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // unprocessable
        case 422: {
          throw new Error(err?.response?.data[0]?.message);
        }

        // generic api error (server related) unexpected
        default: {
          throw new Error(err?.response?.data);
        }
      }
    }
  );

  return instance;
};

const useApi = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const setTokens = (data: any) => {
    dispatch(setToken(data));
  };
  const logOut = (data: any) => {
    dispatch(logout());
  };

  const apiCall = useCallback(
    async ({ customUrl = false, type, url, data, headers = {}, params = {}, showLoader = true }: any) => {
      console.log('hhhh');

      const instance = await getInstance({ token, setTokens, logOut, customUrl, url, data, params });
      console.log(instance, 'instance');

      try {
        if (showLoader) {
          dispatch(setLoading(true));
        }
        switch (type) {
          case types.post: {
            console.log(url, 'instance3');

            let res = await instance.post(url);
            console.log(res, 'instance2');

            return res;
          }

          case types.put: {
            let res = await instance.put(url);
            return res;
          }

          case types.delete: {
            let res = await instance.delete(url);
            return res;
          }

          case types.get: {
            let res = await instance.get(url);
            return res;
          }

          default: {
            let res = await instance.get(url);
            return res;
          }
        }
      } catch (error: any) {
        Toast.show(error?.message);
        throw new Error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [logOut, setTokens, token]
  );

  return { apiCall };
};

export default useApi;

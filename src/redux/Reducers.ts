import { combineReducers } from 'redux';

import AuthReducer from './auth';
import CommonReducer from './common';
import ThemeReducer from './theme';
import HomeReducer from './home';

export default combineReducers({
  auth: AuthReducer,
  theme: ThemeReducer,
  common: CommonReducer,
  home: HomeReducer,
  //     cart: cartReducer,
  //     ycncart: ycnCartReducer,
  //     payment: paymentReducer
});

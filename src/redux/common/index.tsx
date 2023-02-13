import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isInternet: true,
    loading: false,
    qrData: null,
    imagePermission: false,
  },
  reducers: {
    setInternet(state, action) {
      state.isInternet = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setQrData(state, action) {
      state.qrData = action.payload;
    },
    setImagePermission(state, action) {
      state.imagePermission = action.payload;
    },
    resetCommon(state) {
      (state.isInternet = true),
        (state.loading = false),
        (state.qrData = null),
        (state.imagePermission = false);
    },
  },
});

export const {
  setInternet,
  setLoading,
  setQrData,
  resetCommon,
  setImagePermission,
} = commonSlice.actions;

export default commonSlice.reducer;
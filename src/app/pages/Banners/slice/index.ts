import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { bannerSaga } from './saga';
import { BannerState } from './types';

export const initialState: BannerState = {
  bannerPaginate: {
    limit: 20,
    page: 0,
    total: 0,
    results: [],
  },
  bannerDetail: {
    _id: '',
    image: '',
    description: '',
    type: 'top',
  },
};

const slice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    createBanner(state, action: PayloadAction<any>) {},
    createBannerSuccess(state, action: PayloadAction<any>) {
      state.bannerPaginate = {
        ...state.bannerPaginate,
        results: action.payload,
      };
    },

    getListBanner(state, action: PayloadAction<any>) {},
    getListBannerSuccess(state, action: PayloadAction<any>) {
      state.bannerPaginate = action.payload;
    },
    getListBannerFailed(state, action: PayloadAction<any>) {},

    getBannerDetail(state, action: PayloadAction<any>) {},
    getBannerDetailSuccess(state, action: PayloadAction<any>) {
      state.bannerDetail = action.payload;
    },

    editBanner(state, action: PayloadAction<any>) {},
    editBannerSuccess(state, action: PayloadAction<any>) {},

    clearDataBanner(state, action: PayloadAction<any>) {
      state.bannerDetail = {
        _id: '',
        image: '',
        description: '',
        type: 'top',
      };
    },
    deleteBanner(state, action: PayloadAction<any>) {},
  },
});

export const { actions: bannerActions } = slice;

export const useBannerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: bannerSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBannerSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

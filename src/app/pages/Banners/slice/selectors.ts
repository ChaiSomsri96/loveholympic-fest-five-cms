import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.banner || initialState;

export const selectBannerPaginate = createSelector(
  [selectSlice],
  state => state.bannerPaginate,
);

export const selectBannerDetail = createSelector(
  [selectSlice],
  state => state.bannerDetail,
);

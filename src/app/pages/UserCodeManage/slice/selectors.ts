import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.usercode || initialState;

export const selectUserPaginate = createSelector(
  [selectSlice],
  state => state.userPaginate,
);

export const selectSettingSMS = createSelector(
  [selectSlice],
  state => state.setingSMS,
);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

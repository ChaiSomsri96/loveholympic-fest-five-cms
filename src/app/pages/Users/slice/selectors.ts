import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.user || initialState;

export const selectUser = createSelector([selectSlice], state => state);

export const selectUserPaginate = createSelector(
  [selectSlice],
  state => state.userPaginate,
);

export const selectUserDetail = createSelector(
  [selectSlice],
  state => state.user,
);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

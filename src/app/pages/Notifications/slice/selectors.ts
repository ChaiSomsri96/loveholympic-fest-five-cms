import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.notification || initialState;

export const selectNotification = createSelector(
  [selectSlice],
  state => state.listNotification,
);

export const selectCommentNotification = createSelector(
  [selectSlice],
  state => state.listComment,
);

export const selectNotificationDetail = createSelector(
  [selectSlice],
  state => state.detailNotification,
);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.modal || initialState;

export const selectModal = createSelector([selectSlice], state => state);

export const selectShowImportCodeExcel = createSelector(
  [selectSlice],
  state => state.showImportCodeExcel,
);

export const selectShowSettingSendSMS = createSelector(
  [selectSlice],
  state => state.showSettingSendSMS,
);

export const selectShowConfirm = createSelector(
  [selectSlice],
  state => state.showConfirm,
);

export const selectShowSettingSmsUser = createSelector(
  [selectSlice],
  state => state.showSettingSmsUser,
);

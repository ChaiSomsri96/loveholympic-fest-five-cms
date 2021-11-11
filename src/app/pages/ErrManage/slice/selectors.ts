import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.report || initialState;

export const selectListReport = createSelector(
  [selectSlice],
  state => state.listReport,
);

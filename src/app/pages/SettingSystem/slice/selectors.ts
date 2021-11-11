import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.settingSystem || initialState;

export const selectSettingSystem = createSelector(
  [selectSlice],
  state => state,
);

export const selectAllSettingSystem = createSelector(
  [selectSlice],
  state => state.allSettingSystem,
);

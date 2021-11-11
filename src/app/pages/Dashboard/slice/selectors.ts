import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.dashBoard || initialState;

export const selectDashBoard = createSelector([selectSlice], state => state);

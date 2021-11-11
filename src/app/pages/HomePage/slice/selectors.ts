import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.homePage || initialState;

export const selectHomePage = createSelector([selectSlice], state => state);

export const selectUser = createSelector([selectSlice], state => state.user);

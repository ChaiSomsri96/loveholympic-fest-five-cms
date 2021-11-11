import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.global || initialState;

export const selectGlobal = createSelector([selectSlice], state => state);

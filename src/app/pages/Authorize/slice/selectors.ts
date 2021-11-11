import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.authorize || initialState;

export const selectAuthorize = createSelector([selectSlice], state => state);

export const selectMe = createSelector([selectSlice], state => state.profile);

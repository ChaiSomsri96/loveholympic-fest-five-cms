import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.goldenTicket || initialState;

export const selectGoldenTicket = createSelector(
  [selectSlice],
  state => state.listTicket,
);

export const selectListCode = createSelector(
  [selectSlice],
  state => state.optionsCode,
);

export const selectResultTicket = createSelector(
  [selectSlice],
  state => state.ticketResult,
);

export const selectTimeSystem = createSelector(
  [selectSlice],
  state => state.timeSetting,
);

export const selectTickets = createSelector(
  [selectSlice],
  state => state.tickets,
);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

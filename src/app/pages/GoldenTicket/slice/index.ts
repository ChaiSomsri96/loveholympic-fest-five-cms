import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { goldenTicketSaga } from './saga';
import { GoldenTicketState } from './types';
import { defaultState } from 'app/constants';

export const initialState: GoldenTicketState = {
  listTicket: defaultState,
  ticketResult: defaultState,
  optionsCode: [],
  timeSetting: {
    startEndGoldenTicket: {
      from: '',
      to: '',
    },
    iconNotificationSystem: '',
    loholGoodsURL: '',
    youtubeHistoryURL: '',
    typeLivestream: '',
  },
  tickets: {
    imageGlobal: '',
    tickets: [],
    timeFrom: '',
    timeTo: '',
  },
  loading: false,
};

const slice = createSlice({
  name: 'goldenTicket',
  initialState,
  reducers: {
    getListGoldenTicket(state, action: PayloadAction<any>) {},
    getListGoldenTicketSuccess(state, action: PayloadAction<any>) {
      // state.listTicket = action.payload;
      state.tickets = action.payload;
    },

    settingTimeSystem(state, action: PayloadAction<any>) {},
    getTimeSystem(state, action: PayloadAction<any>) {},
    getTimeSystemSuccess(state, action: PayloadAction<any>) {
      state.timeSetting = action.payload;
    },
    getListcode(state, action: PayloadAction<any>) {},
    getListcodeSuccess(state, action: PayloadAction<any>) {
      state.optionsCode = action.payload;
    },

    getResultTicket(state, action: PayloadAction<any>) {},
    getResultTicketSuccess(state, action: PayloadAction<any>) {
      state.ticketResult = action.payload;
    },

    addGoldenTicket(state, action: PayloadAction<any>) {
      state.loading = true;
    },

    addGoldenTicketSuccess(state, action: PayloadAction<any>) {
      state.tickets = action.payload;
      state.loading = false;
    },

    addGoldenTicketFail(state, action: PayloadAction<any>) {
      state.loading = false;
    },
  },
});

export const { actions: goldenTicketActions } = slice;

export const useGoldenTicketSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: goldenTicketSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useGoldenTicketSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

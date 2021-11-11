import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { settingSystemSaga } from './saga';
import { SettingSystemState } from './types';

export const initialState: SettingSystemState = {
  allSettingSystem: {
    _id: '',
    timeFrom: null,
    timeTo: null,
    isOpenCloseLoveHolympic: true,
    setting: {
      loholGoodsURL: '',
      notificationSystemId: '',
      youtubeHistoryURL: '',
      iconNotificationSystem: '',
    },
    goldenTicket: {
      timeFrom: '',
      timeTo: '',
      imageGlobal: '',
    },
    password: '',
    codeLivestream: '',
  },
};

const slice = createSlice({
  name: 'settingSystem',
  initialState,
  reducers: {
    getAllSystem(state, action: PayloadAction<any>) {},
    getAllSystemSuccess(state, action: PayloadAction<any>) {
      state.allSettingSystem = action.payload;
    },
    getAllSystemFailed(state, action: PayloadAction<any>) {},

    updateSystemEvent(state, action: PayloadAction<any>) {},
    updateSystemEventSuccess(state, action: PayloadAction<any>) {},
    updateSystemEventFailed(state, action: PayloadAction<any>) {},

    resetDataTest(state, action: PayloadAction<any>) {},
    resetDataTestSuccess(state, action: PayloadAction<any>) {},
    resetDataTestFailed(state, action: PayloadAction<any>) {},

    resetAllData(state, action: PayloadAction<any>) {},
    resetAllDataSuccess(state, action: PayloadAction<any>) {},
    resetAllDataFailed(state, action: PayloadAction<any>) {},

    createPasswordCode(state, action: PayloadAction<any>) {},
    createPasswordCodeSuccess(state, action: PayloadAction<any>) {},
    createPasswordCodeFailed(state, action: PayloadAction<any>) {},
  },
});

export const { actions: settingSystemActions } = slice;

export const useSettingSystemSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: settingSystemSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSettingSystemSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

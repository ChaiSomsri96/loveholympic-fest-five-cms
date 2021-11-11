import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reportSaga } from './saga';
import { ReportState } from './types';
import { defaultState } from 'app/constants';

export const initialState: ReportState = {
  listReport: defaultState,
};

const slice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getListReport(state, action: PayloadAction<any>) {},
    getListReportSuccess(state, action: PayloadAction<any>) {
      state.listReport = action.payload;
    },

    blockUser(state, action: PayloadAction<any>) {},
    search(state, action: PayloadAction<any>) {},
    searchSuccess(state, action: PayloadAction<any>) {
      state.listReport = action.payload;
    },
  },
});

export const { actions: reportActions } = slice;

export const useReportSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: reportSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useReportSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

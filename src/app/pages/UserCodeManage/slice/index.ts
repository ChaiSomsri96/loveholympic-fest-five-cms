import { paginateDefault } from 'app/constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { usercodeSaga } from './saga';
import { UsercodeState } from './types';

export const initialState: UsercodeState = {
  userPaginate: paginateDefault,
  setingSMS: {
    id: '',
    smsContent: '',
    timeSend: '',
    smsContentUser: '',
  },
  loading: false,
};

const slice = createSlice({
  name: 'usercode',
  initialState,
  reducers: {
    getUserPaginate(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    getUserPaginateSuccess(state, action: PayloadAction<any>) {
      state.userPaginate = action.payload;
      state.loading = false;
    },
    getUserPaginateFailed(state, action: PayloadAction<any>) {},

    searchCode(state, action: PayloadAction<any>) {},
    searchCodeSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.userPaginate = action.payload;
    },

    importCode(state, action: PayloadAction<any>) {
      state.loading = true;
    },

    deleteCodeUser(state, action: PayloadAction<any>) {},
    deleteCodeUserSuccess(state, action: PayloadAction<any>) {},
    deleteCodeUserFailed(state, action: PayloadAction<any>) {},

    getSettingSMS(state, action: PayloadAction<any>) {},
    getSettingSMSSuccess(state, action: PayloadAction<any>) {
      state.setingSMS = action.payload;
    },
    getSettingSMSFailed(state, action: PayloadAction<any>) {},

    createSettingSMS(state, action: PayloadAction<any>) {},
    createSettingSMSSuccess(state, action: PayloadAction<any>) {
      state.setingSMS = action.payload;
    },
    createSettingSMSFailed(state, action: PayloadAction<any>) {},

    sendUserSms(state, action: PayloadAction<any>) {},
    sendUserSmsSuccess(state, action: PayloadAction<any>) {},
    sendUserSmsFailed(state, action: PayloadAction<any>) {},
  },
});

export const { actions: usercodeActions } = slice;

export const useUsercodeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: usercodeSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUsercodeSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userSaga } from './saga';
import { UserState } from './types';
import { paginateDefault } from 'app/constants';

export const initialState: UserState = {
  userPaginate: paginateDefault,
  user: {
    _id: '',
  },
  loading: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getListUser(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    getListUserSuccess(state, action: PayloadAction<any>) {
      state.userPaginate = action.payload;
      state.loading = false;
    },
    getListUserFailed(state, action: PayloadAction<any>) {},

    getUser(state, action: PayloadAction<any>) {},
    getUserSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    getUserFailed(state, action: PayloadAction<any>) {},

    searchUser(state, action: PayloadAction<any>) {},
    searchUserSuccess(state, action: PayloadAction<any>) {
      state.userPaginate = action.payload;
    },

    blockUser(state, action: PayloadAction<any>) {},
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authorizeSaga } from './saga';
import { AuthorizeState } from './types';

export const initialState: AuthorizeState = {
  profile: {
    username: '',
    name: '',
    avatar: '',
  },
};

const slice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {},
    loginSuccess(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    loginFailed(state, action: PayloadAction<any>) {},

    getProfile(state, action: PayloadAction<any>) {},
    getProfileSuccess(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    getProfileFailed(state, action: PayloadAction<any>) {},
  },
});

export const { actions: authorizeActions } = slice;

export const useAuthorizeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authorizeSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthorizeSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

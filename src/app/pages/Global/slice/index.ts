import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { globalSaga } from './saga';
import { GlobalState } from './types';

export const initialState: GlobalState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    Loading(state, action: PayloadAction<any>) {
      console.log(action, 'action');
      state.isLoading = action.payload;
    },
  },
});

export const { actions: globalActions } = slice;

export const useGlobalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: globalSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useGlobalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

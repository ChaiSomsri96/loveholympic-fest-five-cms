import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { modalSaga } from './saga';
import { ModalState } from './types';

export const initialState: ModalState = {
  showImportCodeExcel: false,
  showSettingSendSMS: false,
  showConfirm: false,
  showSettingSmsUser: false,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showImportCodeExcelModal(state, action: PayloadAction<any>) {
      state.showImportCodeExcel = action.payload;
    },

    showSettingSendSMSModal(state, action: PayloadAction<any>) {
      state.showSettingSendSMS = action.payload;
    },

    showConfirmModal(state, action: PayloadAction<any>) {
      state.showConfirm = action.payload;
    },

    showSettingSmsUserModal(state, action: PayloadAction<any>) {
      state.showSettingSmsUser = action.payload;
    },
  },
});

export const { actions: modalActions } = slice;

export const useModalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: modalSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useModalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { notificationSaga } from './saga';
import { NotificationState } from './types';
import { defaultState } from 'app/constants';

export const initialState: NotificationState = {
  listNotification: defaultState,
  listComment: defaultState,
  detailNotification: {
    _id: '',
    description: '',
    name: '',
    title: '',
  },
  loading: false,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    postNotification(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    postNotificationSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
    },
    postNotificationFail(state, action: PayloadAction<any>) {
      state.loading = false;
    },

    getListNotification(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    getListNotificationSuccess(state, action: PayloadAction<any>) {
      state.listNotification = action.payload;
      state.loading = false;
    },
    getListNotificationFail(state, action: PayloadAction<any>) {},

    searchNotification(state, action: PayloadAction<any>) {},
    searchNotificationSuccess(state, action: PayloadAction<any>) {
      state.listNotification = action.payload;
    },

    setPriority(state, action: PayloadAction<any>) {},

    clearDataDetail(state, action: PayloadAction<any>) {
      state.detailNotification = {
        _id: '',
        description: '',
        name: '',
        title: '',
      };
    },

    detailNotification(state, action: PayloadAction<any>) {},
    detailNotificationSuccess(state, action: PayloadAction<any>) {
      state.detailNotification = action.payload;
    },

    editNotification(state, action: PayloadAction<any>) {},
    editNotificationSuccess(state, action: PayloadAction<any>) {
      state.detailNotification = action.payload;
    },

    deleteNotification(state, action: PayloadAction<any>) {},
    deleteNotificationSuccess(state, action: PayloadAction<any>) {
      state.detailNotification = action.payload;
    },
    deleteNotificationFail(state, action: PayloadAction<any>) {},

    getListComment(state, action: PayloadAction<any>) {},
    getListCommentSuccess(state, action: PayloadAction<any>) {
      state.listComment = action.payload;
    },
    getListCommentFail(state, action: PayloadAction<any>) {},

    clearDataComment(state, action: PayloadAction<any>) {
      state.listComment = defaultState;
    },

    deleteComment(state, action: PayloadAction<any>) {},

    replyComment(state, action: PayloadAction<any>) {},

    deleteReply(state, action: PayloadAction<any>) {},
  },
});

export const { actions: notificationActions } = slice;

export const useNotificationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: notificationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useNotificationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

import { toast } from 'react-toastify';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  createNotificationSystem,
  deleteComment,
  deleteNotification,
  getListComment,
  listNotificationSystems,
  repComment,
  detailNotificationSystems,
  searchNotificationSystem,
  editNotificationSystem,
  deleteReply,
  setPriority,
} from 'services/notifications';
import { notificationActions as actions } from '.';
import querryString from 'query-string';
import { messageSnacks } from 'app/constants';

function* getListNotification(action) {
  try {
    const response = yield call(
      listNotificationSystems,
      `?${querryString.stringify(action.payload)}`,
    );
    yield delay(500);
    if (response && response.data) {
      yield put(actions.getListNotificationSuccess(response.data));
      delay(500);
    }
  } catch (error) {
    toast.error('Fail');
    throw error;
  }
}

function* deleteNotifi(action) {
  try {
    const {
      payload: { _id, filter },
    } = action;
    const response = yield call(deleteNotification, _id);
    if (!response) return toast.error('Can not delete notification ');
    messageSnacks.success();
    yield put(actions.getListNotification(filter));
  } catch (error) {
    toast.error('Fail');
    throw error;
  }
}

function* postNotification(action) {
  try {
    const { payload } = action;
    const response = yield call(createNotificationSystem, payload);
    yield put(actions.postNotificationSuccess({}));
    if (response) return messageSnacks.success();
  } catch (error) {
    yield put(actions.postNotificationFail({}));
    throw error;
  }
}

function* taskGetListComment(action) {
  try {
    const {
      payload: { id, filter },
    } = action;
    const response = yield call(getListComment, id, filter);
    if (response.data) {
      yield put(actions.getListCommentSuccess(response.data));
    }
  } catch (error) {
    throw error;
  }
}

function* taskDeleteComment(action) {
  try {
    const {
      payload: { commentId, id },
    } = action;
    const response = yield call(deleteComment, commentId);
    if (response.data.success) {
      yield put(actions.getListComment({ id }));
    }
  } catch (error) {
    throw error;
  }
}

function* taskReplyComment(action) {
  try {
    const {
      payload: { data, filter },
    } = action;
    const id = data.notificationId;
    const response = yield call(repComment, data);
    if (response.data) {
      yield put(actions.getListComment({ id, filter }));
    }
  } catch (error) {
    throw error;
  }
}

function* detailNotification(action) {
  try {
    const response = yield call(detailNotificationSystems, action.payload);
    if (response.data) {
      yield put(actions.deleteNotificationSuccess(response.data));
    }
  } catch (error) {
    throw error;
  }
}

function* searchNotification(action) {
  try {
    const response = yield call(searchNotificationSystem, action.payload);
    if (response.data) {
      yield put(actions.searchNotificationSuccess(response.data));
    }
  } catch (error) {
    throw error;
  }
}

function* editNotification(action) {
  try {
    const { _id, data } = action.payload;
    const response = yield call(editNotificationSystem, _id, data);
    if (response) {
      messageSnacks.success();
      yield put(actions.editNotificationSuccess(response.data));
    }
  } catch (error) {
    throw error;
  }
}

function* taskDeleteReply(action) {
  try {
    const {
      payload: { commentId, id, idParent },
    } = action;
    const response = yield call(deleteReply, commentId, idParent);
    if (response) {
      messageSnacks.success();
      yield put(actions.getListComment({ id }));
    }
  } catch (error) {
    throw error;
  }
}

function* taskSetPriority(action) {
  try {
    const { id, filter } = action.payload;
    yield call(setPriority, id);
    yield put(actions.getListNotification(filter));
  } catch (error) {
    throw error;
  }
}

export function* notificationSaga() {
  yield takeLatest(actions.getListNotification.type, getListNotification);
  yield takeLatest(actions.detailNotification.type, detailNotification);
  yield takeLatest(actions.searchNotification.type, searchNotification);
  yield takeLatest(actions.deleteNotification.type, deleteNotifi);
  yield takeLatest(actions.postNotification.type, postNotification);
  yield takeLatest(actions.editNotification.type, editNotification);

  yield takeLatest(actions.getListComment.type, taskGetListComment);
  yield takeLatest(actions.deleteComment.type, taskDeleteComment);
  yield takeLatest(actions.replyComment.type, taskReplyComment);
  yield takeLatest(actions.setPriority.type, taskSetPriority);
  yield takeLatest(actions.deleteReply.type, taskDeleteReply);
}

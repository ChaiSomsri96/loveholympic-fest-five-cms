import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions as actions } from '.';
import {
  getList,
  getUserDetail,
  searchCode,
  blockUser,
} from 'services/userService';
import queryString from 'query-string';
import { messageSnacks } from 'app/constants';

function* getListUser(action: any) {
  try {
    const res = yield call(getList, `/users/management?${action.payload}`);
    yield put(actions.getListUserSuccess(res.data));
  } catch (error) {
    yield put(actions.getListUserFailed(error));
  }
}

function* getUser(action) {
  try {
    const res = yield call(getUserDetail, `/users/detail/${action.payload}`);
    yield put(actions.getUserSuccess(res.data));
  } catch (error) {
    yield put(actions.getUserFailed(error));
  }
}

function* taskSearchUser(action: any) {
  try {
    const query = queryString.stringify(action.payload);
    const res = yield call(searchCode, `users/list-code?${query}`);
    yield put(actions.searchUserSuccess(res.data));
  } catch (error) {
    console.log({ error });
    yield put(actions.getListUserFailed(error));
  }
}

function* taskBlockUser(action: any) {
  try {
    yield call(blockUser, `/report/block`, action.payload);
    messageSnacks.success();
  } catch (error) {
    console.log({ error });
  }
}

export function* userSaga() {
  yield takeLatest(actions.getListUser.type, getListUser);
  yield takeLatest(actions.getUser.type, getUser);
  yield takeLatest(actions.searchUser.type, taskSearchUser);
  yield takeLatest(actions.blockUser.type, taskBlockUser);
}

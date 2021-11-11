import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  getList,
  deleteCode,
  searchCode,
  importCode,
  getSettingSMSApi,
  createSettingSmsApi,
} from 'services/userService';
import { usercodeActions as actions } from '.';
import queryString from 'query-string';
import { messageSnacks } from 'app/constants';
import { modalActions } from 'app/pages/Modal/slice';

function* getUserPaginate(action: any) {
  try {
    const query = queryString.stringify(action.payload);
    const res = yield call(getList, `/users/list-code?${query}`);
    yield delay(500);
    yield put(actions.getUserPaginateSuccess(res.data));
  } catch (error) {
    yield put(actions.getUserPaginateFailed(error));
    throw error;
  }
}

function* deleteCodeUser(action: any) {
  try {
    const { data, filter } = action.payload;
    yield call(deleteCode, `/users/destroy`, data);
    yield put(actions.getUserPaginate(filter));
    messageSnacks.success();
  } catch (error) {
    messageSnacks.fail();
    yield put(actions.deleteCodeUserFailed(error));
    throw error;
  }
}

function* taskSearch(action: any) {
  try {
    yield call(searchCode, `/users/list-code?search=${action.payload}`);
    yield put(actions.getUserPaginate({}));
  } catch (error) {
    messageSnacks.fail();
    throw error;
  }
}

function* taskImportCode(action: any) {
  try {
    yield call(importCode, `/users/import-code`, action.payload);
    yield put(actions.getUserPaginate({}));
  } catch (error) {
    messageSnacks.fail();
    throw error;
  }
}

function* getSettingSMS(action: any) {
  try {
    const res = yield call(getSettingSMSApi, '/sms');
    yield put(actions.getSettingSMSSuccess(res.data));
  } catch (error) {
    yield put(actions.getSettingSMSFailed(error));
    throw error;
  }
}

function* createSettingSMS(action: any) {
  try {
    const res = yield call(createSettingSmsApi, '/sms', action.payload);
    yield put(actions.createSettingSMSSuccess(res.data));
    yield put(modalActions.showSettingSendSMSModal(false));
    messageSnacks.success();
  } catch (error) {
    yield put(actions.createSettingSMSFailed(error));
    throw error;
  }
}

function* sendUserSms(action: any) {
  try {
    const res = yield call(
      createSettingSmsApi,
      '/sms/send-user',
      action.payload,
    );
    yield put(actions.sendUserSmsSuccess(res.data));
    yield put(modalActions.showSettingSmsUserModal(false));
    // yield put(actions.getUserPaginate(filter));
    messageSnacks.success();
  } catch (error) {
    yield put(actions.sendUserSmsFailed(error));
    throw error;
  }
}

export function* usercodeSaga() {
  yield takeLatest(actions.getUserPaginate.type, getUserPaginate);
  yield takeLatest(actions.deleteCodeUser.type, deleteCodeUser);
  yield takeLatest(actions.searchCode.type, taskSearch);
  yield takeLatest(actions.importCode.type, taskImportCode);
  yield takeLatest(actions.getSettingSMS.type, getSettingSMS);
  yield takeLatest(actions.createSettingSMS.type, createSettingSMS);
  yield takeLatest(actions.sendUserSms.type, sendUserSms);
}

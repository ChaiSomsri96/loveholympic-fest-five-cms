import queryString from 'query-string';
import { call, put, takeLatest } from 'redux-saga/effects';
import { blockUser, getList, searchCode } from 'services/userService';
import { reportActions as actions } from '.';
import { messageSnacks } from 'app/constants';

function* getListReport(action) {
  try {
    const { filter, status } = action.payload;
    const query = queryString.stringify(filter);
    const response = yield call(getList, `/report?status=${status}&${query}`);
    yield put(actions.getListReportSuccess(response.data));
  } catch (error) {
    throw error;
  }
}

function* taskBlockUser(action) {
  try {
    const { status } = action.payload;
    const response = yield call(blockUser, `/report/block`, action.payload);
    yield put(actions.getListReport({ status }));
    if (response) return messageSnacks.success();
  } catch (error) {
    throw error;
  }
}

function* taskSearch(action) {
  try {
    const response = yield call(searchCode, `/report?search=${action.payload}`);
    yield put(actions.searchSuccess(response.data));
  } catch (error) {
    throw error;
  }
}

export function* reportSaga() {
  yield takeLatest(actions.getListReport.type, getListReport);
  yield takeLatest(actions.blockUser.type, taskBlockUser);
  yield takeLatest(actions.search.type, taskSearch);
}

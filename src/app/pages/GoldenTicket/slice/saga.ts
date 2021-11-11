import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  listGoldenTicket,
  listCode,
  createTicket,
  getResutTicket,
  settingTime,
} from 'services/goldenTicket';
import { getSettingSystem } from 'services/adminService';
import { goldenTicketActions as actions } from '.';
import { messageSnacks } from 'app/constants';
import _ from 'lodash';
import querryString from 'query-string';

function* taskGetListGoldenTicket() {
  try {
    const res = yield call(listGoldenTicket, '/golden-ticket');
    yield put(actions.getListGoldenTicketSuccess(res.data));
  } catch (error) {
    throw error;
  }
}

function* taskGetListCode() {
  try {
    const res = yield call(listCode, '/golden-ticket/list-user');
    yield put(actions.getListcodeSuccess(res.data));
  } catch (error) {
    throw error;
  }
}

function* taskAddTicket(action) {
  try {
    const res = yield call(createTicket, '/golden-ticket', action.payload);
    yield delay(2000);
    yield put(actions.addGoldenTicketSuccess(_.get(res, `data`)));
    yield put(actions.getListcode({}));
    messageSnacks.success();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function* taskListResults(action) {
  try {
    const response = yield call(
      getResutTicket,
      `/golden-ticket/results?${querryString.stringify(action.payload)}`,
    );
    yield put(actions.getResultTicketSuccess(response.data));
  } catch (error) {
    throw error;
  }
}

function* taskSettingTime(action) {
  try {
    yield call(settingTime, '/setting', action.payload);
    messageSnacks.success();
  } catch (error) {
    throw error;
  }
}

function* taskGetTimeSystem(action) {
  try {
    const response = yield call(getSettingSystem);
    yield put(actions.getTimeSystemSuccess(response.data?.setting));
  } catch (error) {
    throw error;
  }
}

export function* goldenTicketSaga() {
  yield takeLatest(actions.getListGoldenTicket.type, taskGetListGoldenTicket);
  yield takeLatest(actions.settingTimeSystem.type, taskSettingTime);
  yield takeLatest(actions.getTimeSystem.type, taskGetTimeSystem);
  yield takeLatest(actions.getListcode.type, taskGetListCode);
  yield takeLatest(actions.addGoldenTicket.type, taskAddTicket);
  yield takeLatest(actions.getResultTicket.type, taskListResults);
}

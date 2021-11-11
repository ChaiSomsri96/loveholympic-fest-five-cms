import { call, put, takeLatest } from 'redux-saga/effects';
import { settingSystemActions } from '.';
import {
  configSytemEvent,
  getAllSettingSystemApi,
  resetDataTestApi,
  createPasswordCodeApi,
} from 'services/userService';
import { messageSnacks } from 'app/constants';

function* getUpdateSystemEvent(action: any) {
  try {
    yield call(configSytemEvent, `/setting/config-system`, action.payload);
    yield put(settingSystemActions.updateSystemEventSuccess({}));
    messageSnacks.success();
  } catch (error) {
    yield put(settingSystemActions.updateSystemEventFailed(error));
  }
}

function* getAllSettingSystem(action: any) {
  try {
    const res = yield call(getAllSettingSystemApi, `/setting`);
    yield put(settingSystemActions.getAllSystemSuccess(res.data));
  } catch (error) {
    yield put(settingSystemActions.getAllSystemFailed(error));
  }
}

function* resetDataTest() {
  try {
    yield call(resetDataTestApi, `/setting/reset-data-test`);
    yield put(settingSystemActions.resetDataTestSuccess({}));
    messageSnacks.success();
  } catch (error) {
    yield put(settingSystemActions.resetDataTestFailed(error));
  }
}

function* resetAllData() {
  try {
    yield call(resetDataTestApi, `/setting/reset-all-data`);
    yield put(settingSystemActions.resetAllDataSuccess({}));
    messageSnacks.success();
  } catch (error) {
    yield put(settingSystemActions.resetAllDataFailed(error));
  }
}

function* createPasswordCode(action: any) {
  try {
    const res = yield call(
      createPasswordCodeApi,
      `/setting/create-password`,
      action.payload,
    );
    if (res) {
      yield put(settingSystemActions.createPasswordCodeSuccess({}));
      messageSnacks.success();
    }
  } catch (error) {
    yield put(settingSystemActions.createPasswordCodeFailed(error));
  }
}

export function* settingSystemSaga() {
  yield takeLatest(
    settingSystemActions.updateSystemEvent.type,
    getUpdateSystemEvent,
  );
  yield takeLatest(settingSystemActions.getAllSystem.type, getAllSettingSystem);
  yield takeLatest(settingSystemActions.resetDataTest.type, resetDataTest);
  yield takeLatest(settingSystemActions.resetAllData.type, resetAllData);
  yield takeLatest(
    settingSystemActions.createPasswordCode.type,
    createPasswordCode,
  );
}

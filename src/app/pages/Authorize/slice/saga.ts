import { messageSnacks } from 'app/constants';
import { authorizeActions as actions } from 'app/pages/Authorize/slice';
import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from 'services/AuthService';

function* login(action) {
  try {
    const { values } = action.payload;
    const res = yield call(API.login, values);
    if (!res.data) messageSnacks.fail();
    const { token, admin } = res.data;
    localStorage.setItem('fesAccessToken', token);
    yield put(actions.loginSuccess(admin));
    messageSnacks.success();
    yield put(push('/profile'));
  } catch (error) {
    console.log(error, 'error');
    messageSnacks.fail();
    yield put(actions.loginFailed(error));
  }
}

function* getProfile() {
  try {
    const res = yield call(API.getProfile);
    yield put(actions.getProfileSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* authorizeSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.getProfile.type, getProfile);
}

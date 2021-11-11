import { call, put, takeLatest } from 'redux-saga/effects';
import { bannerActions as actions } from '.';
import {
  getListBanner,
  deleteBanner,
  editBanner,
  createBanner,
} from 'services/adminService';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { messageSnacks } from 'app/constants';

function* taskGetListBanner(action) {
  try {
    const res = yield call(getListBanner, `/banners?${action.payload}`);
    yield put(actions.getListBannerSuccess(res.data));
  } catch (error) {
    throw error;
  }
}

function* taskDeleteBanner(action) {
  try {
    yield call(deleteBanner, `/banners/${action.payload}`);
    messageSnacks.success();
    yield put(actions.getListBanner({}));
  } catch (error) {
    throw error;
  }
}

function* taskGetBannerDetail(action) {
  try {
    const res = yield call(getListBanner, `/banners/${action.payload}`);
    yield put(actions.getBannerDetailSuccess(res.data));
  } catch (error) {
    throw error;
  }
}

function* taskEditBanner(action) {
  try {
    const { data, _id } = action.payload;
    yield call(editBanner, `/banners/${_id}`, data);
    messageSnacks.success();
  } catch (error) {
    throw error;
  }
}

function* taskCreateBanner(action) {
  try {
    const response = yield call(createBanner, `/banners`, action.payload);
    if (!response) return toast.error("Failed! can't add banner");
    yield put(push('/banners'));
    return messageSnacks.success();
  } catch (error) {
    throw error;
  }
}

export function* bannerSaga() {
  yield takeLatest(actions.createBanner.type, taskCreateBanner);
  yield takeLatest(actions.getListBanner.type, taskGetListBanner);
  yield takeLatest(actions.getBannerDetail.type, taskGetBannerDetail);
  yield takeLatest(actions.deleteBanner.type, taskDeleteBanner);
  yield takeLatest(actions.editBanner.type, taskEditBanner);
}

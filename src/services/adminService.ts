import { requestAuth, requestUploadImage } from 'utils/request';

/**
 * Service Banner
 * @returns
 * @param
 *
 */
const getListBanner = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const createBanner = (url, data) => {
  return requestAuth({
    url,
    method: 'post',
    data: data,
  });
};

const deleteBanner = url => {
  requestAuth({ url, method: 'delete' });
};

const editBanner = (url, data) => {
  requestAuth({ url, method: 'put', data: data });
};

const upLoadImg = data => {
  return requestUploadImage({
    url: '/upload-s3',
    method: 'POST',
    data: data,
  });
};

/**
 * Setting System
 * @param
 * @returns
 */

const getSettingSystem = () => {
  return requestAuth({
    url: '/setting',
    method: 'GET',
  });
};

const createSettingSystem = data => {
  return requestAuth({
    url: '/setting',
    method: 'POST',
    data: data,
  });
};

const createImages = data => {
  return requestAuth({
    url: '/banners/image-manage',
    method: 'POST',
    data: data,
  });
};

export {
  getListBanner,
  createBanner,
  deleteBanner,
  upLoadImg,
  createSettingSystem,
  getSettingSystem,
  editBanner,
  createImages,
};

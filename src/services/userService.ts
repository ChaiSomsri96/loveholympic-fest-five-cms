import { requestAuth } from 'utils/request';

/**
 * Service Banner
 * @returns
 * @param
 *
 */
const getList = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const deleteCode = (url: string, data: Object) => {
  return requestAuth({ url, method: 'post', data: data });
};

const importCode = (url: string, data) => {
  return requestAuth({ url, method: 'post', data: data });
};

const getUserDetail = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const searchCode = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const blockUser = (url: string, data: Object) => {
  return requestAuth({ url, method: 'put', data: data });
};

const getSettingSMSApi = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const createSettingSmsApi = (url: string, data) => {
  return requestAuth({ url, method: 'post', data: data });
};

const configSytemEvent = (url: string, data) => {
  return requestAuth({ url, method: 'post', data });
};

const getAllSettingSystemApi = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const resetDataTestApi = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const resetAllDataApi = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const exportDataUser = (url: string) => {
  return requestAuth({ url, method: 'get', responseType: 'blob' });
};

const createPasswordCodeApi = (url: string, data) => {
  return requestAuth({ url, method: 'post', data: data });
};

export {
  getList,
  deleteCode,
  importCode,
  searchCode,
  getUserDetail,
  blockUser,
  getSettingSMSApi,
  createSettingSmsApi,
  configSytemEvent,
  getAllSettingSystemApi,
  resetDataTestApi,
  resetAllDataApi,
  exportDataUser,
  createPasswordCodeApi,
};

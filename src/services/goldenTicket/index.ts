import { requestAuth } from 'utils/request';

/**
 * Service GoldenTicket
 * @returns
 * @param
 *
 */
const listGoldenTicket = (url: string) => {
  return requestAuth({ url, method: 'get' });
};

const listCode = url => {
  return requestAuth({ url, method: 'get' });
};

const createTicket = (url, data) => {
  return requestAuth({ url, method: 'post', data: data });
};

const settingTime = (url, data) => {
  return requestAuth({ url, method: 'post', data: data });
};

const getResutTicket = url => {
  return requestAuth({ url, method: 'get' });
};

const exportData = url => {
  return requestAuth({ url, method: 'get', responseType: 'blob' });
};

export {
  listGoldenTicket,
  listCode,
  createTicket,
  getResutTicket,
  settingTime,
  exportData,
};

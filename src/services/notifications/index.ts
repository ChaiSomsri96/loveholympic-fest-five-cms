import { requestAuth } from 'utils/request';

/**
 * Nofitication
 * @param
 * @returns
 */
const listNotificationSystems = query => {
  return requestAuth({
    url: `/notification-systems/${query}`,
    method: 'GET',
  });
};

const detailNotificationSystems = query => {
  return requestAuth({
    url: `/notification-systems/${query}`,
    method: 'GET',
  });
};

const createNotificationSystem = data => {
  return requestAuth({
    url: '/notification-systems',
    method: 'POST',
    data,
  });
};

const searchNotificationSystem = query => {
  return requestAuth({
    url: `/notification-systems?search=${query}`,
    method: 'get',
  });
};

const deleteNotification = id => {
  return requestAuth({
    url: `/notification-systems/${id}`,
    method: 'DELETE',
  });
};

const editNotificationSystem = (id, data) => {
  return requestAuth({
    url: `/notification-systems/${id}`,
    method: 'put',
    data: data,
  });
};

const getListComment = (id, query) => {
  let queryString = '';
  if (query) {
    queryString = `/?limit=${query.limit}&page=${query.page}`;
  }
  return requestAuth({
    url: `/comments/notifications/${id}${queryString}`,
    method: 'GET',
  });
};

const repComment = data => {
  return requestAuth({
    url: `/comments/reply`,
    method: 'POST',
    data,
  });
};

const deleteComment = id => {
  return requestAuth({
    url: `/comments/${id}`,
    method: 'DELETE',
  });
};

const deleteReply = (id, idParent) => {
  return requestAuth({
    url: `/comments/reply/${id}`,
    method: 'DELETE',
    data: idParent,
  });
};

const setPriority = id => {
  return requestAuth({
    url: `/notification-systems/priority/${id}`,
    method: 'GET',
  });
};

export {
  listNotificationSystems,
  createNotificationSystem,
  deleteNotification,
  getListComment,
  repComment,
  deleteComment,
  detailNotificationSystems,
  searchNotificationSystem,
  editNotificationSystem,
  deleteReply,
  setPriority,
};

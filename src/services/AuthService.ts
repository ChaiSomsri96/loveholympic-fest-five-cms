/* eslint-disable import/no-anonymous-default-export */
import { request, requestAuth } from 'utils/request';

const login = data => {
  return request({ url: '/login', method: 'post', data });
};

const getProfile = () => {
  return requestAuth({
    url: '/me',
    method: 'get',
  });
};

/**
 * @name PROFILE
 */
const updateProfile = data => {
  return requestAuth({
    url: '/update-profile',
    method: 'PUT',
    data: data,
  });
};

const updatePassword = data => {
  return requestAuth({
    url: '/update-password',
    method: 'PUT',
    data: data,
  });
};

export default { login, getProfile, updateProfile, updatePassword };

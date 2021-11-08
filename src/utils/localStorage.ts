const setToken = value => {
  return localStorage.setItem('fesAccessToken', value);
};

const getToken = () => {
  return localStorage.getItem('fesAccessToken');
};

export { setToken, getToken };

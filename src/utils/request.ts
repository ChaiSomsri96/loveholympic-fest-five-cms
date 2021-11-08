import ENV from 'app/envs';
import axios from 'axios';
import { getToken } from 'utils/localStorage';
import browserHistory from 'utils/history';
import { toast } from 'react-toastify';

const API_URL = `${ENV.URL_API}/admin`;
const API_S3 = `${ENV.URL_API}`;

axios.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      browserHistory.push('/auth');
    }
    return Promise.reject(error);
  },
);

const clientImg = axios.create({
  baseURL: API_S3,
  headers: {
    'X-localization': 'en',
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${getToken()}`,
  },
});

const request = async (options: any) => {
  try {
    const res = axios({
      baseURL: API_URL,
      headers: {
        'X-localization': 'en',
      },
      ...options,
    });

    return (await res).data;
  } catch (error) {
    console.log(error);
  }
};

const requestAuth = async (options: any) => {
  try {
    const res = await axios({
      baseURL: API_URL,
      headers: {
        'X-localization': 'en',
        authorization: `Bearer ${localStorage.getItem('fesAccessToken')}`,
      },
      ...options,
    });

    return res.data;
  } catch (error) {
    handleError(error.response.data);
  }
};

const requestUploadImage = async options => {
  try {
    const res = await clientImg(options);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleError = error => {
  toast.error(error.message);
};

export { requestAuth, requestUploadImage, request };

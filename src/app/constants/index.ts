import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const menuItems = [
  // {
  //   link: '사용자 코드 관리',
  //   to: '/user-codes',
  // },
  {
    link: '이미지 관리',
    to: '/image-manage',
  },
  {
    link: '공지 사항 관리',
    to: '/notification-system',
  },
  {
    link: '사용자관리',
    to: '/users',
  },
  {
    link: '수상관리',
    to: '/golden-ticket',
  },
  {
    link: '라이브 방송 관리',
    to: '/live-stream',
  },
  {
    link: '위반신고 관리',
    to: '/report',
  },
];

export const BRANCH_STATUS = {
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
};

export const paginateDefault = {
  page: 0,
  limit: 5,
  sortBy: 'createdAt',
  sortType: -1,
  results: [],
  total: 0,
};

export const fileType = ['jpeg', 'png', 'jpg'];

export const fileTypeExcel = ['xlsx'];

export const defaultState = {
  limit: 20,
  results: [],
  total: 0,
  page: 0,
};

export const formatDate = time => {
  return dayjs(time).format('YYYY/MM/DD');
};

export const getFileType = fileType => {
  var parts = fileType.split('.');
  return parts[parts.length - 1].toLowerCase();
};

export const sort = {
  desc: -1,
  asc: 1,
};

export const defaultFilter = {
  search: '',
  start: '',
  end: '',
  gender: '',
  status: '',
  rank: sort.desc,
  heart: sort.desc,
  luffing: sort.desc,
  win: '',
};

export const typeBanner = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

export const messageSnacks = {
  success: () => toast.success('성공되었습니다'),
  fail: () => toast.error('실패하였습니다.'),
  uploadFail: () => toast.error('이미지를 업로드해주세요.'),
};

export const regexPassword = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$/;

interface User {
  _id: string;
}
interface UserPaginate {
  results: User[];
  total: number;
  page: number;
  limit: number;
  sortType: number;
  sortBy: string;
}

interface SettingSMS {
  id: string;
  smsContent: string;
  timeSend: string;
  smsContentUser: string;
}
export interface UsercodeState {
  userPaginate: UserPaginate;
  setingSMS: SettingSMS;
  loading: boolean;
}

interface User {
  _id: string;
  email?: string;
  nickname?: string;
  phone?: string;
  code?: string;
  lovePoint?: any;
  intellectPoint?: any;
  spiritPoint?: any;
  responsibilityPoint?: any;
  innocencePoint?: any;
  userHolympic?: any;
  userFinal?: any;
  avatars?: any;
  age?: any;
  ranking?: any;
  gender?: string;
  totalHeart?: any;
  personalities?: any;
  hobbies?: any;
  area?: any;
  description?: string;
}
interface UserPaginate {
  results: User[];
  limit: number;
  total: number;
  page: number;
}
export interface UserState {
  userPaginate: UserPaginate;
  user: User;
  loading: boolean;
}

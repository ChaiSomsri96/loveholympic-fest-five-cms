/* --- STATE --- */
interface Banner {
  _id: string;
  image: string;
  description: string;
  type: string;
}
interface BannerPaginate {
  results: Banner[];
  limit: number;
  total: number;
  page: number;
  loholGoodsURL?: string;
}
export interface BannerState {
  bannerPaginate: BannerPaginate;
  bannerDetail: Banner;
}

/* --- STATE --- */
interface dataTicket {
  name: string;
  amount: number;
  assign: number;
  random: number;
  img: string;
}

interface DataResult {
  user: any;
  goldenTicket: any;
}

interface Code {
  _id: string;
  nickname: string;
  phone: string;
}
interface Tikcet {
  results: dataTicket[];
  limit: number;
  total: number;
  page: number;
}
interface TikcetResult {
  results: DataResult[];
  limit: number;
  total: number;
  page: number;
}
interface Setting {
  startEndGoldenTicket: {
    from?: any;
    to?: any;
  };
  iconNotificationSystem: string;
  loholGoodsURL: string;
  youtubeHistoryURL: string;
  typeLivestream: string;
}

interface TicketData {
  imageLucky: string;
  ramdom: number;
  users: any;
  name: string;
}

interface TicketSystem {
  imageGlobal: string;
  tickets: TicketData[];
  timeFrom: string;
  timeTo: string;
}
export interface GoldenTicketState {
  listTicket: Tikcet;
  ticketResult: TikcetResult;
  optionsCode: Code[];
  timeSetting: Setting;
  tickets: TicketSystem;
  loading: boolean;
}

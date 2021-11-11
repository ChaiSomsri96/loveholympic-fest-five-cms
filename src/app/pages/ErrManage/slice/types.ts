/* --- STATE --- */
interface User {
  code: string;
  email?: string;
  nickname?: string;
  phone?: string;
}

interface Report {
  _id: string;
  totalReport?: number;
  user: User;
}

interface ListReport {
  results: Report[];
  limit: number;
  total: number;
  page: number;
}

export interface ReportState {
  listReport: ListReport;
}

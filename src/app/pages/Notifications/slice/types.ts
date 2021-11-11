/* --- STATE --- */
interface Notification {
  _id: string;
  name: string;
  description: string;
  title: string;
  image?: string;
}
interface Comment {
  user: any;
  _id: string;
}
interface notifications {
  results: Notification[];
  limit: number;
  total: number;
  page: number;
}
interface comments {
  results: Comment[];
  limit: number;
  total: number;
  page: number;
}
export interface NotificationState {
  listNotification: notifications;
  listComment: comments;
  detailNotification: Notification;
  loading: boolean;
}

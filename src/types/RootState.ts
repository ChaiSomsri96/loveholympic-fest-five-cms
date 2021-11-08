import { HomePageState } from 'app/pages/HomePage/slice/types';
import { DashBoardState } from 'app/pages/Dashboard/slice/types';
import { AuthorizeState } from 'app/pages/Authorize/slice/types';
import { UsercodeState } from 'app/pages/UserCodeManage/slice/types';
import { NotificationState } from 'app/pages/Notifications/slice/types';
import { GlobalState } from 'app/pages/Global/slice/types';
import { BannerState } from 'app/pages/Banners/slice/types';
import { ModalState } from 'app/pages/Modal/slice/types';
import { UserState } from 'app/pages/Users/slice/types';
import { GoldenTicketState } from 'app/pages/GoldenTicket/slice/types';
import { SettingSystemState } from 'app/pages/SettingSystem/slice/types';
import { ReportState } from 'app/pages/ErrManage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  homePage?: HomePageState;
  dashBoard?: DashBoardState;
  authorize?: AuthorizeState;
  usercode?: UsercodeState;
  notification?: NotificationState;
  global?: GlobalState;
  banner?: BannerState;
  modal?: ModalState;
  user?: UserState;
  goldenTicket?: GoldenTicketState;
  settingSystem?: SettingSystemState;
  report?: ReportState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

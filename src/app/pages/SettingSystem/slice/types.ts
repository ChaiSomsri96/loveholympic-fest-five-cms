interface AllSettingSystem {
  _id: string;
  timeFrom?: any;
  timeTo?: any;
  isOpenCloseLoveHolympic?: boolean;
  setting?: any;
  goldenTicket?: any;
  password?: string;
  codeLivestream?: string;
}

export interface SettingSystemState {
  allSettingSystem: AllSettingSystem;
}

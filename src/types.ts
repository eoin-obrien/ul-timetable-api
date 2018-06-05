export interface IAppSyncEvent {
  field: string;
  args: Object;
}

export interface ICourseTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
    year: number;
  };
}

export interface IModuleTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IRoomTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IStudentTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IModuleExamTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IStudentExamTimetableBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IModuleBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IRoomBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

export interface IWeekBatchEvent extends IAppSyncEvent {
  args: {
    id: string;
  };
}

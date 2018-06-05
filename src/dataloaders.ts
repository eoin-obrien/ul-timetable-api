import * as DataLoader from 'dataloader';
import {
  ICourseTimetable,
  IModuleDetails,
  IModuleExamTimetable,
  IModuleTimetable,
  IRoomDetails,
  IRoomTimetable,
  IStudentExamTimetable,
  IStudentTimetable,
  IWeekDate,
} from 'ul-timetable';
import {
  batchCourseTimetables,
  batchModuleExamTimetables,
  batchModules,
  batchModuleTimetables,
  batchRooms,
  batchRoomTimetables,
  batchStudentExamTimetables,
  batchStudentTimetables,
  batchWeeks,
} from './resolvers';
import {
  ICourseTimetableBatchEvent,
  IModuleBatchEvent,
  IModuleExamTimetableBatchEvent,
  IModuleTimetableBatchEvent,
  IRoomBatchEvent,
  IRoomTimetableBatchEvent,
  IStudentExamTimetableBatchEvent,
  IStudentTimetableBatchEvent,
  IWeekBatchEvent,
} from './types';

export function loadFromDataLoader<K, V>(dataloader: DataLoader<K, V>, keys: K[], callback: AWSLambda.Callback): void {
  dataloader.loadMany(keys)
    .then(callback.bind(null, null))
    .catch(callback);
}

export function courseTimetableDataLoader(): DataLoader<ICourseTimetableBatchEvent, ICourseTimetable> {
  return new DataLoader(batchCourseTimetables);
}

export function moduleTimetableDataLoader(): DataLoader<IModuleTimetableBatchEvent, IModuleTimetable> {
  return new DataLoader(batchModuleTimetables);
}

export function roomTimetableDataLoader(): DataLoader<IRoomTimetableBatchEvent, IRoomTimetable> {
  return new DataLoader(batchRoomTimetables);
}

export function studentTimetableDataLoader(): DataLoader<IStudentTimetableBatchEvent, IStudentTimetable> {
  return new DataLoader(batchStudentTimetables);
}

export function moduleExamTimetableDataLoader(): DataLoader<IModuleExamTimetableBatchEvent, IModuleExamTimetable> {
  return new DataLoader(batchModuleExamTimetables);
}

export function studentExamTimetableDataLoader(): DataLoader<IStudentExamTimetableBatchEvent, IStudentExamTimetable> {
  return new DataLoader(batchStudentExamTimetables);
}

export function moduleDataLoader(): DataLoader<IModuleBatchEvent, IModuleDetails> {
  return new DataLoader(batchModules);
}

export function roomDataLoader(): DataLoader<IRoomBatchEvent, IRoomDetails> {
  return new DataLoader(batchRooms);
}

export function weekDataLoader(): DataLoader<IWeekBatchEvent, IWeekDate | null> {
  return new DataLoader(batchWeeks);
}

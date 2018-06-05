import {
  courseTimetable,
  ICourseTimetable,
  IModuleDetails,
  IModuleExamTimetable,
  IModuleTimetable,
  IRoomDetails,
  IRoomTimetable,
  IStudentExamTimetable,
  IStudentTimetable,
  IWeekDate,
  moduleDetails,
  moduleExamTimetable,
  moduleTimetable,
  roomDetails,
  roomTimetable,
  studentExamTimetable,
  studentTimetable,
  weekDates,
} from 'ul-timetable';
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

export async function batchCourseTimetables(keys: ICourseTimetableBatchEvent[]): Promise<ICourseTimetable[]> {
  const promises = keys.map((key: ICourseTimetableBatchEvent) => courseTimetable(key.args.id, key.args.year));

  return Promise.all(promises);
}

export async function batchModuleTimetables(keys: IModuleTimetableBatchEvent[]): Promise<IModuleTimetable[]> {
  const promises = keys.map((key: IModuleTimetableBatchEvent) => moduleTimetable(key.args.id));

  return Promise.all(promises);
}

export async function batchRoomTimetables(keys: IRoomTimetableBatchEvent[]): Promise<IRoomTimetable[]> {
  const promises = keys.map((key: IRoomTimetableBatchEvent) => roomTimetable(key.args.id));

  return Promise.all(promises);
}

export async function batchStudentTimetables(keys: IStudentTimetableBatchEvent[]): Promise<IStudentTimetable[]> {
  const promises = keys.map((key: IStudentTimetableBatchEvent) => studentTimetable(key.args.id));

  return Promise.all(promises);
}

export async function batchModuleExamTimetables(keys: IModuleExamTimetableBatchEvent[]): Promise<IModuleExamTimetable[]> {
  const promises = keys.map((key: IModuleExamTimetableBatchEvent) => moduleExamTimetable(key.args.id));

  return Promise.all(promises);
}

export async function batchStudentExamTimetables(keys: IStudentExamTimetableBatchEvent[]): Promise<IStudentExamTimetable[]> {
  const promises = keys.map((key: IStudentExamTimetableBatchEvent) => studentExamTimetable(key.args.id));

  return Promise.all(promises);
}

export async function batchModules(keys: IModuleBatchEvent[]): Promise<IModuleDetails[]> {
  const promises = keys.map((key: IModuleBatchEvent) => moduleDetails(key.args.id));

  return Promise.all(promises);
}

export async function batchRooms(keys: IRoomBatchEvent[]): Promise<IRoomDetails[]> {
  const promises = keys.map((key: IRoomBatchEvent) => roomDetails(key.args.id));

  return Promise.all(promises);
}

export async function batchWeeks(keys: IWeekBatchEvent[]): Promise<(IWeekDate | null)[]> {
  const weeks = await weekDates();

  return keys.map((key: IWeekBatchEvent) => weeks.find((week: IWeekDate) => week.id === key.args.id) || null);
}

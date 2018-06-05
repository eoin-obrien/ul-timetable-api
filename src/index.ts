import { weekDates } from 'ul-timetable';
import {
  courseTimetableDataLoader,
  moduleDataLoader,
  moduleExamTimetableDataLoader,
  moduleTimetableDataLoader,
  roomDataLoader,
  roomTimetableDataLoader,
  studentExamTimetableDataLoader,
  studentTimetableDataLoader,
  weekDataLoader,
} from './dataloaders';
import {
  IAppSyncEvent,
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
import {
  loadFromDataLoader,
  loadFromResolver,
} from './util';

export const graphqlHandler: AWSLambda.Handler = (event: IAppSyncEvent[], _: AWSLambda.Context, cb: AWSLambda.Callback) => {
  const field = event[0].field;

  switch (field) {
    case 'courseTimetable':
      loadFromDataLoader(courseTimetableDataLoader(), event as ICourseTimetableBatchEvent[], cb);
      break;

    case 'moduleTimetable':
      loadFromDataLoader(moduleTimetableDataLoader(), event as IModuleTimetableBatchEvent[], cb);
      break;

    case 'roomTimetable':
      loadFromDataLoader(roomTimetableDataLoader(), event as IRoomTimetableBatchEvent[], cb);
      break;

    case 'studentTimetable':
      loadFromDataLoader(studentTimetableDataLoader(), event as IStudentTimetableBatchEvent[], cb);
      break;

    case 'moduleExamTimetable':
      loadFromDataLoader(moduleExamTimetableDataLoader(), event as IModuleExamTimetableBatchEvent[], cb);
      break;

    case 'studentExamTimetable':
      loadFromDataLoader(studentExamTimetableDataLoader(), event as IStudentExamTimetableBatchEvent[], cb);
      break;

    case 'module':
    case 'CourseTimetableLesson.module':
    case 'RoomTimetableLesson.modules':
    case 'StudentTimetableLesson.module':
    case 'ModuleExamTimetable.module':
      loadFromDataLoader(moduleDataLoader(), event as IModuleBatchEvent[], cb);
      break;

    case 'room':
    case 'CourseTimetableLesson.rooms':
    case 'ModuleTimetableLesson.rooms':
    case 'StudentTimetableLesson.rooms':
    case 'ModuleExamTimetable.room':
      loadFromDataLoader(roomDataLoader(), event as IRoomBatchEvent[], cb);
      break;

    case 'week':
    case 'CourseTimetableLesson.weeks':
    case 'ModuleTimetableLesson.weeks':
    case 'RoomTimetableLesson.weeks':
    case 'StudentTimetableLesson.weeks':
      loadFromDataLoader(weekDataLoader(), event as IWeekBatchEvent[], cb);
      break;

    case 'weeks':
      loadFromResolver(weekDates, cb);
      break;

    default:
      cb(new Error(`Unknown field, unable to resolve "${field}"`));
  }
};

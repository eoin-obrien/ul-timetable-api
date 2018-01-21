import { getWeeks } from './connectors';
import {
  Context, ModuleQueryArgs, RoomQueryArgs, RootValue, StudentTimetableLesson,
  StudentTimetableQueryArgs, WeekQueryArgs,
} from '../types';
import { isValidModuleId, isValidRoomId, isValidStudentTimetableId, isValidWeekId } from './util';

const resolveFunctions = {
  RootQuery: {
    studentTimetable(root: RootValue, args: StudentTimetableQueryArgs, context: Context) {
      if (!isValidStudentTimetableId(args.id)) {
        throw new TypeError('Student timetable ID is invalid');
      }
      return context.dataloaders.studentTimetables.load(args.id);
    },
    module(root: RootValue, args: ModuleQueryArgs, context: Context) {
      if (!isValidModuleId(args.id)) {
        throw new TypeError('Module ID is invalid');
      }
      return context.dataloaders.modules.load(args.id);
    },
    room(root: RootValue, args: RoomQueryArgs, context: Context) {
      if (!isValidRoomId(args.id)) {
        throw new TypeError('Room ID is invalid');
      }
      return context.dataloaders.studentTimetables.load(args.id);
    },
    week(root: RootValue, args: WeekQueryArgs, context: Context) {
      if (!isValidWeekId(args.id)) {
        throw new TypeError('Week ID is invalid');
      }
      return context.dataloaders.weeks.load(args.id);
    },
    weeks() {
      return getWeeks();
    },
  },
  StudentTimetableLesson: {
    module(lesson: StudentTimetableLesson, args: {}, context: Context) {
      return context.dataloaders.modules.load(lesson.module);
    },
    rooms(lesson: StudentTimetableLesson, args: {}, context: Context) {
      return context.dataloaders.studentTimetables.loadMany(lesson.rooms);
    },
    weeks(lesson: StudentTimetableLesson, args: {}, context: Context) {
      return context.dataloaders.weeks.loadMany(lesson.weeks);
    },
  },
};

export default resolveFunctions;

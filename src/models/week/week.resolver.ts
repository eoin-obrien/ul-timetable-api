import { WeekType } from './week.model';
import { scrapeWeeks } from './week.scraper';
import { LessonType } from '../timetable/timetable.model';

interface IWeekArgs {
  _id: string;
}

export function getWeeks(): Promise<WeekType[]> {
  return scrapeWeeks();
}

export function getWeek(_id: string): Promise<WeekType> {
  return getWeeks()
    .then(weeks => weeks.find(week => week._id === _id));
}

export const resolvers = {
  RootQuery: {
    week(obj: Object, args: IWeekArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return getWeek(args._id);
    },
    weeks(obj: Object, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return getWeeks();
    },
  },
  Lesson: {
    weeks(lesson: LessonType, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return getWeeks();
    },
  },
};

import { WeekType } from './week.model';
import { scrapeWeeks } from './week.scraper';
import { LessonType } from '../timetable/timetable.model';

interface IWeekArgs {
  _id: string;
}

function getWeeks(): Promise<WeekType[]> {
  return scrapeWeeks();
}

function getWeek(_id: string): Promise<WeekType> {
  return scrapeWeeks()
    .then(weeks => weeks.find(week => week._id === _id));
}

export const resolvers = {
  RootQuery: {
    week(obj: Object, args: IWeekArgs) {
      return getWeek(args._id);
    },
    weeks() {
      return getWeeks();
    },
  },
  Lesson: {
    weeks(lesson: LessonType) {
      return getWeeks();
    },
  },
};

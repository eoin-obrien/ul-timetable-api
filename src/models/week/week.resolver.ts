import { WeekType } from './week.model';
import { scrapeWeeks } from './week.scraper';

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
    weeks(obj: Object, args: IWeekArgs) {
      return getWeeks();
    },
  },
};

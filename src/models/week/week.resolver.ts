import { scrapeWeeks } from './week.scraper';
import { IWeek } from '../../types/models/IWeek';
import { DataLoaders } from '../../schema/dataloaders';

interface IWeekArgs {
  _id: string;
}

export function getWeeks(): Promise<IWeek[]> {
  return scrapeWeeks();
}

export function getWeek(_id: string): Promise<IWeek> {
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
    weeks(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return getWeeks();
    },
  },
};

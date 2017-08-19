import { scrapeWeeks } from './week.scraper';
import { IWeek } from '../../types/models/IWeek';
import { IDataLoaders } from '../../dataloaders';
import { ILesson } from '../../types/models/ILesson';
import { IWeekQueryArgs } from '../../types/query-args/IWeekQueryArgs';

export function getWeeks(): Promise<IWeek[]> {
  return scrapeWeeks();
}

export function getWeek(_id: string): Promise<IWeek> {
  return getWeeks()
    .then(weeks => weeks.find(week => week._id === _id));
}

export const resolvers = {
  RootQuery: {
    week(obj: Object, args: IWeekQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return getWeek(args._id);
    },
    weeks(obj: Object, args: Object, { dataloaders }: { dataloaders: IDataLoaders }) {
      return getWeeks();
    },
  },
  Lesson: {
    weeks(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: IDataLoaders }) {
      return getWeeks();
    },
  },
};

import { TimetableType } from './timetable.model';
import { scrapeTimetable } from './timetable.scraper';
import { DataLoaders } from '../../schema/dataloaders';

interface ITimetableArgs {
  _id: string;
}

export function getTimetable(_id: string): Promise<TimetableType> {
  return scrapeTimetable(_id);
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.timetableLoader.load(args._id);
    },
  },
};

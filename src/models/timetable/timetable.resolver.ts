import { scrapeTimetable } from './timetable.scraper';
import { DataLoaders } from '../../dataloaders';
import { ITimetable } from '../../types/models/ITimetable';

interface ITimetableArgs {
  _id: string;
}

export function getTimetable(_id: string): Promise<ITimetable> {
  return scrapeTimetable(_id);
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.timetableLoader.load(args._id);
    },
  },
};

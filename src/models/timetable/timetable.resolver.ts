import { scrapeTimetable } from './timetable.scraper';
import { IDataLoaders } from '../../dataloaders';
import { ITimetable } from '../../types/models/ITimetable';
import { ITimetableQueryArgs } from '../../types/query-args/ITimetableQueryArgs';

export function getTimetable(_id: string): Promise<ITimetable> {
  return scrapeTimetable(_id);
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.timetableLoader.load(args._id);
    },
  },
};

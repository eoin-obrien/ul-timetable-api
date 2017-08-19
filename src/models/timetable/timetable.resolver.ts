import { scrapeTimetable } from './timetable.scraper';
import { IDataLoaders } from '../../dataloaders';
import { ITimetable } from '../../types/models/ITimetable';
import { ITimetableQueryArgs } from '../../types/query-args/ITimetableQueryArgs';
import { GraphQLError } from 'graphql';

function assertValidStudentId(id: string) {
  if (!/^[0-9]{7,8}$/.test(id)) {
    throw new GraphQLError(`Student ID "${id}" is invalid.`);
  }
}

export function getTimetable(_id: string): Promise<ITimetable> {
  assertValidStudentId(_id);
  return scrapeTimetable(_id);
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.timetableLoader.load(args._id);
    },
  },
};

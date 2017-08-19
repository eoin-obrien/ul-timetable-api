import { scrapeTimetable } from './timetable.scraper';
import { IDataLoaders } from '../../dataloaders';
import { ITimetable } from '../../types/models/ITimetable';
import { ITimetableQueryArgs } from '../../types/query-args/ITimetableQueryArgs';
import { GraphQLError } from 'graphql';
import { Timetable } from './timetable.model';

function assertValidStudentId(id: string) {
  if (!/^[0-9]{7,8}$/.test(id)) {
    throw new GraphQLError(`Student ID "${id}" is invalid.`);
  }
}

export async function getTimetable(_id: string): Promise<ITimetable> {
  assertValidStudentId(_id);
  const cachedTimetable = await Timetable.findById(_id);
  if (cachedTimetable && !cachedTimetable.isStale()) {
    return cachedTimetable;
  }
  const scrapedTimetable = await scrapeTimetable(_id);
  return Timetable.findByIdAndUpdate(_id, scrapedTimetable, { new: true, upsert:true });
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.timetableLoader.load(args._id);
    },
  },
};

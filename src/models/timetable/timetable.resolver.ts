import { scrapeTimetable } from './timetable.scraper';
import { IDataLoaders } from '../../dataloaders';
import { ITimetable } from '../../types/models/ITimetable';
import { ITimetableQueryArgs } from '../../types/query-args/ITimetableQueryArgs';
import { Timetable } from './timetable.model';
import { ILesson } from '../../types/models/ILesson';
import { assertValidStudentId } from './timetable.schema';
import { assertValidWeekId } from '../week/week.schema';
import { isNullOrUndefined } from 'util';

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
    timetable: async (obj: Object, args: ITimetableQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) => {
      const timetable = await dataloaders.timetableLoader.load(args._id);
      if (!isNullOrUndefined(args.week)) {
        assertValidWeekId(args.week);
        const weekFilter = (lesson: ILesson) => lesson.weeks.includes(args.week);
        timetable.monday = timetable.monday.filter(weekFilter);
        timetable.tuesday = timetable.tuesday.filter(weekFilter);
        timetable.wednesday = timetable.wednesday.filter(weekFilter);
        timetable.thursday = timetable.thursday.filter(weekFilter);
        timetable.friday = timetable.friday.filter(weekFilter);
        timetable.saturday = timetable.saturday.filter(weekFilter);
      }
      return timetable;
    },
  },
};

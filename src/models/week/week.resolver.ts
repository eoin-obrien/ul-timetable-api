import { scrapeWeeks } from './week.scraper';
import { IWeek } from '../../types/models/IWeek';
import { IDataLoaders } from '../../dataloaders';
import { ILesson } from '../../types/models/ILesson';
import { IWeekQueryArgs } from '../../types/query-args/IWeekQueryArgs';
import { Week } from './week.model';
import { assertValidWeekId } from './week.schema';

export async function getWeeks(): Promise<IWeek[]> {
  const cachedWeeks = await Week.find();
  if (cachedWeeks.length && cachedWeeks.every(week => !week.isStale())) {
    return cachedWeeks;
  }
  const scrapedWeeks = await scrapeWeeks();
  return Promise.all(scrapedWeeks.map(week => Week.findByIdAndUpdate(week._id, week, { new: true, upsert:true })));
}

export async function getWeek(_id: string): Promise<IWeek> {
  assertValidWeekId(_id);
  const cachedWeek = await Week.findById(_id);
  if (cachedWeek && !cachedWeek.isStale()) {
    return cachedWeek;
  }
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
      return lesson.weeks.map(getWeek);
    },
  },
};

import { TimetableType } from './timetable.model';
import { scrapeTimetable } from './timetable.scraper';

interface ITimetableArgs {
  _id: string;
}

function getTimetable(_id: string): Promise<TimetableType> {
  return scrapeTimetable(_id);
}

export const resolvers = {
  RootQuery: {
    timetable(obj: Object, args: ITimetableArgs) {
      return getTimetable(args._id);
    },
  },
};

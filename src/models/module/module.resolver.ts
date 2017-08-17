import { ModuleType } from './module.model';
import { scrapeModule } from './module.scraper';
import { LessonType } from '../timetable/timetable.model';

interface IModuleArgs {
  _id: string;
}

function getModule(_id: string): Promise<ModuleType> {
  return scrapeModule(_id);
}

export const resolvers = {
  RootQuery: {
    module(obj: Object, args: IModuleArgs) {
      return getModule(args._id);
    },
  },
  Lesson: {
    module(lesson: LessonType) {
      return getModule(lesson.module);
    },
  },
};

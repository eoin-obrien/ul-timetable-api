import { ModuleType } from './module.model';
import { scrapeModule } from './module.scraper';
import { LessonType } from '../timetable/timetable.model';
import { DataLoaders } from '../../schema/dataloaders';

interface IModuleArgs {
  _id: string;
}

export function getModule(_id: string): Promise<ModuleType> {
  return scrapeModule(_id);
}

export const resolvers = {
  RootQuery: {
    module(obj: Object, args: IModuleArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.moduleLoader.load(args._id);
    },
  },
  Lesson: {
    module(lesson: LessonType, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.moduleLoader.load(lesson.module);
    },
  },
};

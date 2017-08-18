import { scrapeModule } from './module.scraper';
import { DataLoaders } from '../../schema/dataloaders';
import { IModule } from '../../types/models/IModule';

interface IModuleArgs {
  _id: string;
}

export function getModule(_id: string): Promise<IModule> {
  return scrapeModule(_id);
}

export const resolvers = {
  RootQuery: {
    module(obj: Object, args: IModuleArgs, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.moduleLoader.load(args._id);
    },
  },
  Lesson: {
    module(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: DataLoaders }) {
      return dataloaders.moduleLoader.load(lesson.module);
    },
  },
};

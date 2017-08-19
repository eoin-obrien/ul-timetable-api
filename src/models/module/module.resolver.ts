import { scrapeModule } from './module.scraper';
import { IDataLoaders } from '../../dataloaders';
import { IModule } from '../../types/models/IModule';
import { ILesson } from '../../types/models/ILesson';
import { IModuleQueryArgs } from '../../types/query-args/IModuleQueryArgs';

export function getModule(_id: string): Promise<IModule> {
  return scrapeModule(_id);
}

export const resolvers = {
  RootQuery: {
    module(obj: Object, args: IModuleQueryArgs, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.moduleLoader.load(args._id);
    },
  },
  Lesson: {
    module(lesson: ILesson, args: Object, { dataloaders }: { dataloaders: IDataLoaders }) {
      return dataloaders.moduleLoader.load(lesson.module);
    },
  },
};

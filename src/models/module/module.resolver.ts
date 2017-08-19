import { scrapeModule } from './module.scraper';
import { IDataLoaders } from '../../dataloaders';
import { IModule } from '../../types/models/IModule';
import { ILesson } from '../../types/models/ILesson';
import { IModuleQueryArgs } from '../../types/query-args/IModuleQueryArgs';
import { GraphQLError } from 'graphql';
import { Module } from './module.model';

function assertValidModuleId(id: string) {
  if (!/^[A-Z]{2}\d{4}$/.test(id)) {
    throw new GraphQLError(`Module ID "${id}" is invalid.`);
  }
}

export async function getModule(_id: string): Promise<IModule> {
  assertValidModuleId(_id);
  const cachedModule = await Module.findById(_id);
  if (cachedModule && !cachedModule.isStale()) {
    return cachedModule;
  }
  const scrapedModule = await scrapeModule(_id);
  return scrapedModule && Module.findByIdAndUpdate(_id, scrapedModule, { new: true, upsert:true });
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

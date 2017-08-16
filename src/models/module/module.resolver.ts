import { ModuleType } from './module.model';
import { scrapeModule } from './module.scraper';

interface IModuleArgs {
  _id: string;
}

function getModule(_id: string): Promise<ModuleType> {
  return scrapeModule(_id);
}

export const resolvers = {
  RootQuery: {
    module(obj: Object, args: IModuleArgs) {
      console.log(`Module resolver called for ${args._id}`);
      return getModule(args._id);
    },
  },
};

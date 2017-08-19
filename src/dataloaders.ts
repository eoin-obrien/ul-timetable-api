import * as DataLoader from 'dataloader';
import { getRoom } from './models/room/room.resolver';
import { getModule } from './models/module/module.resolver';
import { getTimetable } from './models/timetable/timetable.resolver';
import { getWeeks } from './models/week/week.resolver';
import { ITimetable } from './types/models/ITimetable';
import { IWeek } from './types/models/IWeek';
import { IModule } from './types/models/IModule';
import { IRoom } from './types/models/IRoom';

async function batchModules(keys: string[]): Promise<IModule[]> {
  return Promise.all(keys.map(getModule));
}

async function batchRooms(keys: string[]): Promise<IRoom[]> {
  return Promise.all(keys.map(getRoom));
}

async function batchTimetables(keys: string[]): Promise<ITimetable[]> {
  return Promise.all(keys.map(getTimetable));
}

async function batchWeeks(): Promise<IWeek[]> {
  return getWeeks();
}

export interface IDataLoaders {
  moduleLoader: DataLoader<string, IModule>;
  roomLoader: DataLoader<string, IRoom>;
  timetableLoader: DataLoader<string, ITimetable>;
  weekLoader: DataLoader<string, IWeek>;
}

export function buildDataLoaders(): IDataLoaders {
  return {
    moduleLoader: new DataLoader(keys => batchModules(keys)),
    roomLoader: new DataLoader(keys => batchRooms(keys)),
    timetableLoader: new DataLoader(keys => batchTimetables(keys)),
    weekLoader: new DataLoader(() => batchWeeks()),
  };
}

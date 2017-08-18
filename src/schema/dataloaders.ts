import * as DataLoader from 'dataloader';
import { ModuleType } from '../models/module/module.model';
import { TimetableType } from '../models/timetable/timetable.model';
import { WeekType } from '../models/week/week.model';
import { getRoom, RoomType } from '../models/room/room.resolver';
import { getModule } from '../models/module/module.resolver';
import { getTimetable } from '../models/timetable/timetable.resolver';
import { getWeeks } from '../models/week/week.resolver';

async function batchModules(keys: string[]): Promise<ModuleType[]> {
  return Promise.all(keys.map(getModule));
}

async function batchRooms(keys: string[]): Promise<RoomType[]> {
  return Promise.all(keys.map(getRoom));
}

async function batchTimetables(keys: string[]): Promise<TimetableType[]> {
  return Promise.all(keys.map(getTimetable));
}

async function batchWeeks(): Promise<WeekType[]> {
  return getWeeks();
}

export interface DataLoaders {
  moduleLoader: DataLoader<string, ModuleType>;
  roomLoader: DataLoader<string, RoomType>;
  timetableLoader: DataLoader<string, TimetableType>;
  weekLoader: DataLoader<string, WeekType>;
}

export function buildDataLoaders(): DataLoaders {
  return {
    moduleLoader: new DataLoader(keys => batchModules(keys)),
    roomLoader: new DataLoader(keys => batchRooms(keys)),
    timetableLoader: new DataLoader(keys => batchTimetables(keys)),
    weekLoader: new DataLoader(() => batchWeeks()),
  };
}

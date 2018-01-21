import * as DataLoader from 'dataloader';
import { DataLoaders, Module, Room, StudentTimetable, Week } from '../types';
import { getModule, getRoom, getStudentTimetable, getWeeks } from './connectors';

async function batchModules(keys: string[]): Promise<(Module | null)[]> {
  return Promise.all(keys.map(getModule));
}

async function batchRooms(keys: string[]): Promise<(Room | null)[]> {
  return Promise.all(keys.map(getRoom));
}

async function batchTimetables(keys: string[]): Promise<(StudentTimetable | null)[]> {
  return Promise.all(keys.map(getStudentTimetable));
}

async function batchWeeks(): Promise<Week[]> {
  return getWeeks();
}

export function getDataLoaders(): DataLoaders {
  return {
    modules: new DataLoader<string, Module | null>(keys => batchModules(keys)),
    rooms: new DataLoader<string, Room | null>(keys => batchRooms(keys)),
    studentTimetables: new DataLoader<string, StudentTimetable | null>(keys => batchTimetables(keys)),
    weeks: new DataLoader<string, Week | null>(() => batchWeeks()),
  };
}

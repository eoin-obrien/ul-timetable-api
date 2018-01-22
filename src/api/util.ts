import * as rpn from 'request-promise-native';
import * as cheerio from 'cheerio';
import { Context } from '../types';
import { getDataLoaders } from './dataloaders';

export const buildingCodes: { [key: string]: string } = {
  S: 'Schuman Building',
  KB: 'Kemmy Business School',
  CS: 'Computer Science Building',
  GL: 'Glucksman Library',
  F: 'Foundation Building',
  ER: 'Engineering Research Building',
  LC: 'Languages Building',
  L: 'Lonsdale Building',
  SR: 'Schrödinger Building',
  P: 'PESS Building',
  HS: 'Health Sciences Building',
  A: 'Main Building Block A',
  B: 'Main Building Block B',
  C: 'Main Building Block C',
  D: 'Main Building Block D',
  E: 'Main Building Block E',
  AD: 'Analog Devices Building',
  IW: 'Irish World Academy Building',
  GEMS: 'Medical School',
};

export function getContext(): Context {
  return {
    dataloaders: getDataLoaders(),
  };
}

export async function crawl<T>(method: string, uri: string, form?: any): Promise<CheerioStatic> {
  const options: rpn.Options = {
    uri,
    method,
    form,
    transform(body: any) {
      return cheerio.load(body);
    },
  };
  return await rpn(options);
}

export function isValidRoomId(id: string) {
  const roomCodePattern = /^(S|KB|CS|GL|F|ER|LC|L|SR|P|HS|A|B|C|D|E|AD|IW|GEMS)([BGMO0123])([0-9]+[A-Z]?)$/;
  return roomCodePattern.test(id);
}

export function isValidModuleId(id: string) {
  const moduleCodePattern = /^[A-Z]{2}\d{4}$/;
  return moduleCodePattern.test(id);
}

export function isValidWeekId(id: string) {
  const weekIdPattern = /^([1-9]|1[0-4]?)$/;
  return weekIdPattern.test(id);
}

export function isValidStudentTimetableId(id: string) {
  const studentIdPattern = /^[0-9]{7,8}$/;
  return studentIdPattern.test(id);
}

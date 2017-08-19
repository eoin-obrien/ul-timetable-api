import * as rangeParser from 'parse-numeric-range';
import { scrape } from '../../scraper';
import { Timetable } from './timetable.model';
import { ITimetable } from '../../types/models/ITimetable';
import { ILesson } from '../../types/models/ILesson';

const studentIdPattern = /^[0-9]{7,8}$/;
const entrySplitPattern = /\s*<.*?>(?:.*?<\/.*?>)?\s*(?:&#xA0;)?/;
const daySelector = 'body > div > table > tbody > tr:nth-child(2) > td';
const entrySelector = 'p > font > b';

export function validateStudentId(studentId: string): boolean {
  return studentIdPattern.test(studentId);
}

export function parseLesson(element: string): ILesson {
  const parts = element.trim().split(entrySplitPattern);
  return {
    startTime: parts[0],
    endTime: parts[1],
    module: parts[2],
    type: parts[3],
    group: parts[4] || null,
    rooms: parts[5].split(/\s+/),
    weeks: rangeParser.parse(parts[6].substring(4)),
  };
}

export function parse(studentId: string, $: CheerioStatic): ITimetable {
  const timetable: ITimetable = new Timetable({
    _id: studentId,
  });
  const lessons: ILesson[][] = [];
  $(daySelector).each((i, day) => {
    lessons[i] = [];
    $(entrySelector, day).each((j, lessonElement) => {
      lessons[i][j] = parseLesson($(lessonElement).html());
    });
  });
  timetable.monday = lessons[0];
  timetable.tuesday = lessons[1];
  timetable.wednesday = lessons[2];
  timetable.thursday = lessons[3];
  timetable.friday = lessons[4];
  timetable.saturday = lessons[5];
  return timetable;
}

export function scrapeTimetable(studentId: string): Promise<ITimetable> {
  const uri = 'http://www.timetable.ul.ie/tt2.asp';
  const form = {
    T1: studentId,
  };
  return scrape('post', uri, form).then($ => parse(studentId, $));
}

import * as rangeParser from 'parse-numeric-range';
import scraper from '../../scraper';
import { LessonType, Timetable, TimetableType } from './timetable.model';

const studentIdPattern = /^[0-9]{7,8}$/;
const entrySplitPattern = /\s*<.*?>(?:.*?<\/.*?>)?\s*(?:&#xA0;)?/;
const daySelector = 'body > div > table > tbody > tr:nth-child(2) > td';
const entrySelector = 'p > font > b';

export function validateStudentId(studentId: string): boolean {
  return studentIdPattern.test(studentId);
}

export function parseLesson(element: string): LessonType {
  const parts = element.trim().split(entrySplitPattern);
  return {
    startTime: parts[0],
    endTime: parts[1],
    module: parts[2],
    type: parts[3],
    group: parts[4] || null,
    room: parts[5],
    weeks: rangeParser.parse(parts[6].substring(4)),
  };
}

export function parse(studentId: string, $: CheerioStatic): TimetableType {
  const timetable: TimetableType = new Timetable({
    _id: studentId,
  });
  const lessons: LessonType[][] = [];
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

export function scrapeTimetable(studentId: string): Promise<TimetableType> {
  const uri = 'http://www.timetable.ul.ie/tt2.asp';
  const form = {
    T1: studentId,
  };
  return scraper('post', uri, form).then($ => parse(studentId, $));
}

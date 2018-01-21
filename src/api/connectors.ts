import titleCapitalization = require('title-capitalization');
import { Module, StudentTimetable, StudentTimetableLesson, Week, Room } from '../types';
import { buildingCodes, crawl } from './util';
import * as rangeParser from 'parse-numeric-range';

const roomCodePattern = /^(S|KB|CS|GL|F|ER|LC|L|SR|P|HS|A|B|C|D|E|AD|IW|GEMS)([BGMO0123])([0-9]+[A-Z]?)$/;

const studentTimetableEntrySplitPattern = /\s*<.*?>(?:.*?<\/.*?>)?\s*(?:&#xA0;)?/;
const studentTimetableDaySelector = 'body > div > table > tbody > tr:nth-child(2) > td';
const studentTimetableEntrySelector = 'p > font > b';

const weekSelector = 'body > table > tbody > tr';
const startDateSelector = 'td:nth-child(1)';
const teachingWeekSelector = 'td:nth-child(2)';
const timetableWeekSelector = 'td:nth-child(3)';

const moduleTitleSelector = 'body > b > table > tbody > tr > td > div > center > table > tbody' +
  ' > tr:nth-child(2) > td:nth-child(2)';

export function parseStudentTimetableLesson(lessonHtml: string): StudentTimetableLesson {
  const lessonParts = lessonHtml.trim().split(studentTimetableEntrySplitPattern);
  return {
    startTime: lessonParts[0],
    endTime: lessonParts[1],
    module: lessonParts[2],
    type: lessonParts[3],
    group: lessonParts[4] || null,
    rooms: lessonParts[5].split(/\s+/),
    weeks: rangeParser.parse(lessonParts[6].substring(4)),
  };
}

export async function getStudentTimetable(id: string): Promise<StudentTimetable | null> {
  const $ = await crawl('post', 'https://www.timetable.ul.ie/tt2.asp', { T1: id });
  const lessons: StudentTimetableLesson[][] = [];
  $(studentTimetableDaySelector).each((dayIndex, day) => {
    lessons[dayIndex] = [];
    $(studentTimetableEntrySelector, day).each((lessonIndex, lessonElement) => {
      lessons[dayIndex][lessonIndex] = parseStudentTimetableLesson($(lessonElement).html());
    });
  });
  if (lessons.every(day => day.length === 0)) {
    return null;
  }
  return {
    id,
    monday: lessons[0],
    tuesday: lessons[1],
    wednesday: lessons[2],
    thursday: lessons[3],
    friday: lessons[4],
    saturday: lessons[5],
  };
}


export async function getModule(id: string): Promise<Module | null> {
  const $ = await crawl('post', 'https://www.timetable.ul.ie/tt_moduledetails_res.asp', { T1: id });
  const name = titleCapitalization($(moduleTitleSelector).text().trim().toLowerCase());
  if (name.length === 0) {
    return null;
  }
  return { id, name };
}

export async function getWeeks(): Promise<Week[]> {
  const $ = await crawl('get', 'https://www.timetable.ul.ie/weeks.htm');
  const weeks: Week[] = [];
  $(weekSelector).slice(1).each((weekIndex, row) => {
    weeks[weekIndex] = {
      id: $(timetableWeekSelector, row).text(),
      name: $(teachingWeekSelector, row).text(),
      date: new Date($(startDateSelector, row).text()),
    };
  });
  return weeks;
}

export function getRoom(id: string): Room | null {
  const codeParts: string[] = id.match(roomCodePattern);
  return {
    id,
    buildingCode: codeParts[1],
    building: buildingCodes[codeParts[1]],
    floor: codeParts[2],
    number: codeParts[3],
  };
}

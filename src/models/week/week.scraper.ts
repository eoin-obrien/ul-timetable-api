import { scrape } from '../../scraper';
import { Week } from './week.model';
import { IWeek } from '../../types/models/IWeek';

const weekSelector = 'body > table > tbody > tr';
const startDateSelector = 'td:nth-child(1)';
const teachingWeekSelector = 'td:nth-child(2)';
const timetableWeekSelector = 'td:nth-child(3)';

export function parse($: CheerioStatic): IWeek[] {
  const weeks: IWeek[] = [];
  $(weekSelector).slice(1).each((i, row) => {
    weeks[i] = new Week({
      _id: Number($(timetableWeekSelector, row).text()),
      name: $(teachingWeekSelector, row).text(),
      date: new Date($(startDateSelector, row).text()),
    });
  });
  return weeks;
}

export function scrapeWeeks(): Promise<IWeek[]> {
  const uri = 'http://www.timetable.ul.ie/weeks.htm';
  return scrape('get', uri, null).then(parse);
}

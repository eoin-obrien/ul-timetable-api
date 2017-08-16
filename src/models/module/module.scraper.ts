import titleCapitalization = require('title-capitalization');
import scraper from '../../scraper';
import { Module, ModuleType } from './module.model';

const codeSelector
  = 'body > b > table > tbody > tr > td > div > center > table > tbody > tr:nth-child(1) > td:nth-child(2)';
const titleSelector
  = 'body > b > table > tbody > tr > td > div > center > table > tbody > tr:nth-child(2) > td:nth-child(2)';

export function parse($: CheerioStatic): ModuleType {
  const _id = $(codeSelector).text().trim();
  const name = titleCapitalization($(titleSelector).text().trim().toLowerCase());
  return new Module({
    _id,
    name,
  });
}

export function scrapeModule(moduleCode: string): Promise<ModuleType> {
  const uri = 'http://www.timetable.ul.ie/tt_moduledetails_res.asp';
  const form = {
    T1: moduleCode,
  };
  return scraper('post', uri, form).then(parse);
}

import * as cheerio from 'cheerio';
import * as rp from 'request-promise-native';

export default function scrape<T>(method: string, uri: string, form: any): Promise<CheerioStatic> {
  console.log(`Scraped ${uri} with args ${JSON.stringify(form)}`);
  const options = {
    form,
    method,
    uri,
    transform: (body: string) => cheerio.load(body),
  };
  return rp(options);
}

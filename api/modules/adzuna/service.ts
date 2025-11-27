import type { Keywords } from '@/api/modules/keywords/model';
import { type AdzunaJobObject } from '@/api/modules/adzuna/model';

import Undici from 'undici';

const RESULTS_PER_PAGE = '1';
const ADZUNA_API_URL = 'https://api.adzuna.com/v1/api/jobs';

export class AdzunaService {
  private keywords: Keywords;

  constructor(keywords: Keywords) {
    this.keywords = keywords;
  }

  public async fetchJobs(): Promise<AdzunaJobObject | void> {
    if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_API_KEY) {
      throw new Error(
        'Adzuna API credentials are not properly set in environment variables',
      );
    }

    if (!this.keywords?.country) {
      throw new Error('Country is required to fetch jobs from Adzuna API');
    }

    const url = new URL(`${ADZUNA_API_URL}/${this.keywords?.country}/search/1`);

    url.searchParams.append('app_id', process.env.ADZUNA_APP_ID);
    url.searchParams.append('app_key', process.env.ADZUNA_API_KEY);
    url.searchParams.append('results_per_page', RESULTS_PER_PAGE);

    try {
      const { body, statusCode } = await Undici.request(url);

      if (statusCode !== 200) {
        throw new Error('Adzuna API responded with non-200 status code');
      }

      return (await body.json()) as AdzunaJobObject;
    } catch (error: unknown) {
      throw new Error(
        `Error fetching jobs from Adzuna API: ${(error as Error).message}`,
      );
    }
  }
}

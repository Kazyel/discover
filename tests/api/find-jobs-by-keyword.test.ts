import type { AdzunaResponse } from '@/api/modules/adzuna/model';
import type { ReadKeywordsResponse } from '@/api/modules/keywords/model';

import { describe, expect, it } from 'bun:test';
import Undici from 'undici';

const KEYWORDS_URL = 'http://localhost:3000/api/v1/guilds/';
const JOB_URL = 'http://localhost:3000/api/v1/adzuna/jobs';

const MOCK_GUILD_ID = '570627205793579010';

describe('Adzuna API Endpoints', () => {
  it('should fetch jobs successfully from Adzuna API', async () => {
    const keywordsResponse = await Undici.request(
      `${KEYWORDS_URL}${MOCK_GUILD_ID}/keywords`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    expect(keywordsResponse.statusCode).toBe(200);

    const keywordsBody =
      (await keywordsResponse.body.json()) as ReadKeywordsResponse;

    const jobResponse = await Undici.request(JOB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guildId: keywordsBody.data.guildId,
        keywords: keywordsBody.data.keywords,
      }),
    });

    expect(jobResponse.statusCode).toBe(200);

    const responseBody = (await jobResponse.body.json()) as AdzunaResponse;

    expect(responseBody.data).toHaveProperty('results');
    expect(Array.isArray(responseBody.data.results)).toBe(true);
  });
});

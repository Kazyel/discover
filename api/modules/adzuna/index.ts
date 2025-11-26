import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { AdzunaService } from '@/api/modules/adzuna/service';
import { AdzunaModel } from '@/api/modules/adzuna/model';

export const adzunaRoute = new Elysia<string, APIContext>()
  /**
   * Fetch jobs from Adzuna API based on keywords
   */
  .get(
    '/adzuna/jobs',
    async ({ log, status }) => {
      log.info(`Initiating job fetch from Adzuna API for guild`);
      const adzuna = new AdzunaService({ what: 'teste', country: 'br' });

      try {
        const data = await adzuna.fetchJobs();

        if (!data) {
          log.warn('No data returned from Adzuna API');
          return status(404, { data: { message: 'No jobs found' } });
        }

        log.info(`Successfully fetched jobs from Adzuna API`);
        return status(200, {
          data: {
            message: 'Jobs fetched successfully',
            results: data.results,
          },
        });
      } catch (error: unknown) {
        log.error(`${(error as Error).message}`);

        return status(400, {
          data: {
            message: 'Error fetching jobs from Adzuna API',
            error: (error as Error).message,
          },
        });
      }
    },
    {
      body: AdzunaModel.body,
      response: {
        200: AdzunaModel.response,
        400: AdzunaModel.response,
        404: AdzunaModel.response,
      },
    },
  );

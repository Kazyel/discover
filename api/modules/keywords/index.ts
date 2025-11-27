import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { KeywordsModel } from '@/api/modules/keywords/model';
import { KeywordsService } from '@/api/modules/keywords/service';

const { readResponse } = KeywordsModel.read;
const { createRequestBody, createResponse } = KeywordsModel.create;

export const keywordsRoute = new Elysia<string, APIContext>()
  /**
   * Get all keywords for a specific guild
   */
  .get(
    '/:guildId/keywords',
    async ({ params, db, log, request, status }) => {
      log.info(`GET | Request ${request.url}`);
      log.info(`Fetching keywords for guild: ${params.guildId}`);

      const keywordsService = new KeywordsService(db);

      try {
        const keywords = await keywordsService.getKeywordsByGuildId(
          params.guildId,
        );

        return status(200, {
          data: {
            message: 'Keywords retrieved successfully',
            guildId: params.guildId,
            keywords: keywords[0] || {},
          },
        });
      } catch (error: unknown) {
        log.error(`Error fetching keywords: ${error}`);

        return status(400, {
          data: {
            message: 'Internal Server Error',
            error: (error as Error).message,
          },
        });
      }
    },
    {
      response: {
        200: readResponse,
        400: readResponse,
      },
    },
  )

  /**
   * Update keywords for a guild
   */
  .patch(
    '/:guildId/keywords',
    async ({ params, body, db, log, request, status }) => {
      log.info(`PATCH | Request ${request.url}`);
      log.info(`Updating keywords for guild: ${params.guildId}`);

      const keywordsService = new KeywordsService(db);

      try {
        await keywordsService.setKeywords({
          guildId: params.guildId,
          keywords: body,
        });

        return status(200, {
          data: {
            message: 'Keyword updated successfully',
          },
        });
      } catch (error: unknown) {
        log.error(`Error creating keyword: ${error}`);

        return status(400, {
          data: {
            message: 'Internal Server Error',
            error: (error as Error).message,
          },
        });
      }
    },
    {
      body: createRequestBody,
      response: {
        200: createResponse,
        400: createResponse,
      },
    },
  );

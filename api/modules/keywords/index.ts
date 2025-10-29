import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { keywordsCreate, keywordsRetrieve } from '@/api/modules/keywords/model';
import { KeywordsService } from '@/api/modules/keywords/service';

const { createRequestBody, createResponse } = keywordsCreate;
const { retrieveBody, retrieveResponse } = keywordsRetrieve;

export const keywordsRoute = new Elysia<string, APIContext>()

  /**
   * Get all keywords for a guild
   */
  .get('/:guildId/keywords', async ({ params, db, log, status }) => {
    log.info(`Fetching keywords for guild: ${params.guildId}`);
    return status(200, { data: { keywords: [] } });
  })

  /**
   * Create keyword for a guild
   */
  .post(
    '/:guildId/keywords',
    async ({ params, body, db, log, status }) => {
      log.info(`Creating keyword for guild: ${params.guildId}`);
      const keywordsService = new KeywordsService(db);

      try {
        await keywordsService.createKeyword(params.guildId, body);
      } catch (error: unknown) {
        log.error(`Error creating keyword: ${error}`);

        return status(400, {
          data: {
            message: 'Internal Server Error',
            error: (error as Error).message,
          },
        });
      }

      return status(201, {
        data: {
          message: 'Keyword created',
        },
      });
    },
    {
      body: createRequestBody,
      response: {
        201: createResponse,
        400: createResponse,
      },
    },
  )

  /**
   * Delete specific keyword
   */
  .delete(
    '/:guildId/keywords/:keywordId',
    async ({ params, db, log, status }) => {
      log.info(
        `Deleting keyword ${params.keywordId} from guild ${params.guildId}`,
      );

      return status(200, { data: { message: 'Keyword deleted' } });
    },
  );

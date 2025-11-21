import type { APIContext } from '@/api/core/api';

import { Elysia } from 'elysia';
import { KeywordsModel } from '@/api/modules/keywords/model';
import { KeywordsService } from '@/api/modules/keywords/service';

const { readResponse } = KeywordsModel.read;
const { deleteResponse } = KeywordsModel.delete;
const { createRequestBody, createResponse } = KeywordsModel.create;

export const keywordsRoute = new Elysia<string, APIContext>()
  /**
   * Get all keywords for a guild
   */
  .get(
    '/:guildId/keywords',
    async ({ params, db, log, status }) => {
      log.info(`Fetching keywords for guild: ${params.guildId}`);
      return status(200, {
        data: { message: 'Keywords retrieved successfully', keywords: [] },
      });
    },
    {
      response: {
        200: readResponse,
      },
    },
  )

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

        return status(201, {
          data: {
            message: 'Keyword created',
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
    {
      response: {
        200: deleteResponse,
      },
    },
  );

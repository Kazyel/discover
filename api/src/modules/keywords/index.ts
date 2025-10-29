import type { APIContext } from '@/api/src/core/api';
import { Elysia } from 'elysia';

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
  .post('/:guildId/keywords', async ({ params, body, db, log, status }) => {
    log.info(`Creating keyword for guild: ${params.guildId}`);
    return status(201, { data: { message: 'Keyword created' } });
  })

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

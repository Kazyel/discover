import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Database } from '../../models/database';

import { z } from 'zod';

export namespace GuildModel {
  export const requestBody = z.object({
    guildId: z.string(),
    guildName: z.string(),
  });

  export const createBody = z.object({
    guildId: z.string(),
    guildName: z.string(),
    db: z.instanceof(Database<NeonHttpDatabase>),
  });

  export const createResponse = z.object({
    data: z.object({
      message: z.string(),
    }),
  });

  export type requestBody = z.infer<typeof requestBody>;

  export type createBody = z.infer<typeof createBody>;
  export type createErrorResponse = z.infer<typeof createResponse>;
}

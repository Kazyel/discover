import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { Database } from '@/api/src/core/database';

import { z } from 'zod';

export const GuildModel = {
  retrieve: {
    retrieveBody: z.object({
      guildId: z.string(),
      db: z.instanceof(Database<NeonHttpDatabase>),
    }),

    retrieveResponse: z.object({
      data: z.object({
        message: z.string(),
        guild: z.array(
          z
            .object({
              id: z.number(),
              guildId: z.string(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        ),
      }),
    }),
  },

  create: {
    createRequestBody: z.object({
      guildId: z.string(),
      guildName: z.string(),
    }),

    createServiceParams: z.object({
      guildId: z.string(),
      guildName: z.string(),
      db: z.instanceof(Database<NeonHttpDatabase>),
    }),

    createResponse: z.object({
      data: z.object({
        message: z.string(),
      }),
    }),
  },
};

export const retrieve = GuildModel.retrieve;
export const create = GuildModel.create;

export type CreateServiceParams = z.infer<typeof create.createServiceParams>;
export type RetrieveBody = z.infer<typeof retrieve.retrieveBody>;

import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Database } from '../../core/database';

import { z } from 'zod';

export namespace GuildModel {
  export const RetrieveBody = z.object({
    guildId: z.string(),
    db: z.instanceof(Database<NeonHttpDatabase>),
  });

  export const RetrieveResponse = z.object({
    data: z.array(
      z.object({
        id: z.number(),
        guildId: z.string(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    ),
  });

  export const CreateRequestBody = z.object({
    guildId: z.string(),
    guildName: z.string(),
  });

  export const CreateServiceParams = z.object({
    guildId: z.string(),
    guildName: z.string(),
    db: z.instanceof(Database<NeonHttpDatabase>),
  });

  export const CreateResponse = z.object({
    data: z.object({
      message: z.string(),
    }),
  });

  export type RetrieveBody = z.infer<typeof RetrieveBody>;

  export type CreateRequestBody = z.infer<typeof CreateRequestBody>;
  export type CreateServiceParams = z.infer<typeof CreateServiceParams>;
  export type CreateResponse = z.infer<typeof CreateResponse>;
}

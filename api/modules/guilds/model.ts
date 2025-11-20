import { z } from 'zod';

export const GuildModel = {
  retrieve: {
    retrieveResponse: z.object({
      data: z.object({
        message: z.string(),
        guilds: z.array(
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
    }),

    createResponse: z.object({
      data: z.object({
        message: z.string(),
        error: z.string().optional(),
      }),
    }),
  },
};

export const guildRetrieve = GuildModel.retrieve;
export const guildCreate = GuildModel.create;

export type CreateServiceParams = z.infer<
  typeof guildCreate.createServiceParams
>;

import { z } from 'zod';

const BASE_GUILD_RESPONSE_OBJECT = z.object({
  data: z.object({
    message: z.string(),
    error: z.string().optional(),
  }),
});

export const GuildModel = {
  read: {
    readResponse: z.object({
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
            .optional(),
        ),
        error: z.string().optional(),
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

    createResponse: BASE_GUILD_RESPONSE_OBJECT,
  },

  update: {
    updateRequestBody: z.object({
      guildName: z.string(),
    }),

    updateResponse: BASE_GUILD_RESPONSE_OBJECT,
    updateServiceParams: z.object({
      guildId: z.string(),
      newName: z.string(),
    }),
  },

  delete: {
    deleteResponse: BASE_GUILD_RESPONSE_OBJECT,
  },
};

export type CreateGuildServiceParams = z.infer<
  typeof GuildModel.create.createServiceParams
>;

export type UpdateGuildServiceParams = z.infer<
  typeof GuildModel.update.updateServiceParams
>;

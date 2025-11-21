import { z } from 'zod';

const BASE_KEYWORDS_RESPONSE_OBJECT = z.object({
  data: z.object({
    message: z.string(),
    error: z.string().optional(),
  }),
});

const KEYWORDS_BASE_OBJECT = z.object({
  type: z.enum(['search', 'where']),
  keywords: z.object({
    what: z.string().optional(),
    what_or: z.string().optional(),
    what_and: z.string().optional(),
    what_exclude: z.string().optional(),
    title_only: z.string().optional(),
    where: z.string().optional(),
    distance: z.number().optional(),
  }),
});

export const KeywordsModel = {
  read: {
    readResponse: z.object({
      data: z.object({
        message: z.string(),
        keywords: z.array(
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
      }),
    }),
  },

  create: {
    createResponse: BASE_KEYWORDS_RESPONSE_OBJECT,
    createRequestBody: KEYWORDS_BASE_OBJECT,
    createServiceParams: z.object({
      guildId: z.string(),
      keywords: KEYWORDS_BASE_OBJECT,
    }),
  },

  delete: {
    deleteResponse: BASE_KEYWORDS_RESPONSE_OBJECT,
  },
};

export type Keywords = z.infer<typeof KEYWORDS_BASE_OBJECT>;

export type CreateServiceParams = z.infer<
  typeof KeywordsModel.create.createServiceParams
>;

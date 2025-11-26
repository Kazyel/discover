import { z } from 'zod';

const KEYWORDS_BASE_OBJECT = z
  .object({
    what: z.string().optional(),
    what_or: z.string().optional(),
    what_and: z.string().optional(),
    what_exclude: z.string().optional(),
    title_only: z.string().optional(),
    where: z.string().optional(),
    distance: z.number().optional(),
    country: z.string().optional(),
  })
  .optional();

const BASE_KEYWORDS_RESPONSE_OBJECT = z.object({
  data: z.object({
    message: z.string(),
    guildId: z.string().optional(),
    keywords: KEYWORDS_BASE_OBJECT,
    error: z.string().optional(),
  }),
});

export const KeywordsModel = {
  read: {
    readResponse: BASE_KEYWORDS_RESPONSE_OBJECT,
  },

  create: {
    createResponse: BASE_KEYWORDS_RESPONSE_OBJECT,
    createRequestBody: KEYWORDS_BASE_OBJECT,
    createServiceParams: z.object({
      guildId: z.string(),
      keywords: KEYWORDS_BASE_OBJECT,
    }),
  },
};

export type Keywords = z.infer<typeof KEYWORDS_BASE_OBJECT>;

export type CreateKeywordServiceParams = z.infer<
  typeof KeywordsModel.create.createServiceParams
>;

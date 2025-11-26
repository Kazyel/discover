import { z } from 'zod';

const ADZUNA_JOB_OBJECT = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      contract_time: z.string().optional(),
      location: z.object({
        area: z.array(z.string()),
        display_name: z.string(),
      }),
      title: z.string(),
      description: z.string(),
      created: z.string(),
      redirect_url: z.string(),
      company: z.object({
        display_name: z.string(),
      }),
    }),
  ),
});

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

export const AdzunaModel = {
  body: z.object({
    keywords: KEYWORDS_BASE_OBJECT,
    guildId: z.string(),
  }),

  response: z.object({
    data: z.object({
      message: z.string(),
      results: ADZUNA_JOB_OBJECT.shape.results.optional(),
      error: z.string().optional(),
    }),
  }),

  adzuna: {
    fetchResponse: ADZUNA_JOB_OBJECT,
  },
};

export type AdzunaResponse = z.infer<typeof ADZUNA_JOB_OBJECT>;

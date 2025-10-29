import { z } from 'zod';

const keywordsBase = z.object({
  what: z.string().optional(),
  // what_or: z.string().nullable(),
  // what_and: z.string().nullable(),
  // what_exclude: z.string().nullable(),
  // title_only: z.string().nullable(),
  // where: z.string().nullable(),
  // distance: z.number().nullable(),
});

export const KeywordsModel = {
  retrieve: {
    retrieveBody: z.string(),
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
    createRequestBody: keywordsBase,

    createServiceParams: z.object({
      guildId: z.string(),
      keywords: keywordsBase,
    }),

    createResponse: z.object({
      data: z.object({
        message: z.string(),
        error: z.string().optional(),
      }),
    }),
  },
};

export const keywordsRetrieve = KeywordsModel.retrieve;
export const keywordsCreate = KeywordsModel.create;

export type Keywords = z.infer<typeof keywordsBase>;

export type CreateServiceParams = z.infer<
  typeof keywordsCreate.createServiceParams
>;

export type RetrieveBody = z.infer<typeof keywordsRetrieve.retrieveBody>;

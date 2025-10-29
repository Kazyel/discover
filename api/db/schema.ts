import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const guildsTable = pgTable('guilds', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  guildId: varchar('guild_id', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const guildKeywordsTable = pgTable('guild_keywords', {
  id: serial('id').primaryKey(),
  guildId: varchar('guild_id', { length: 255 })
    .references(() => guildsTable.guildId)
    .notNull(),
  what: varchar('what', { length: 255 }).default('').notNull(),
  what_and: varchar('what_and', { length: 255 }).default('').notNull(),
  what_exclude: varchar('what_exclude', { length: 255 }).default('').notNull(),
  what_or: varchar('what_or', { length: 255 }).default('').notNull(),
  title_only: varchar('title_only', { length: 255 }).default('').notNull(),
  where: varchar('where', { length: 255 }).default('').notNull(),
  country: varchar('country', { length: 2 }).default('').notNull(),
  distance: integer('distance').default(0).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

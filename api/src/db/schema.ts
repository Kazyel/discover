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
  keyword: varchar('keyword', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

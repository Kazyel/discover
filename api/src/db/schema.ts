import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const guildsTable = pgTable('guilds', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  guildId: varchar({ length: 255 }).notNull().unique(),
});

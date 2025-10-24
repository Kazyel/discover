import type { GuildModel } from '@/api/src/modules/guilds/model';

import { guildsTable } from '@/api/src/db/schema';
import { eq } from 'drizzle-orm';

export abstract class GuildService {
  static async createGuild({
    guildId,
    guildName,
    db,
  }: GuildModel.CreateServiceParams) {
    try {
      await db
        .getDatabase()
        .insert(guildsTable)
        .values({
          name: guildName,
          guildId,
        })
        .execute();
    } catch (error) {
      throw new Error(`Failed to create guild: ${error}`);
    }

    return { message: 'Guild created', guild: { guildId, guildName } };
  }

  static async getGuildById({ guildId, db }: GuildModel.RetrieveBody) {
    try {
      const guild = await db
        .getDatabase()
        .select()
        .from(guildsTable)
        .where(eq(guildsTable.guildId, guildId))
        .execute();

      return guild;
    } catch (error) {
      throw new Error(`Failed to retrieve guild: ${error}`);
    }
  }
}

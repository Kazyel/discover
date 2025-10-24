import type { GuildModel } from '@/api/src/modules/guilds/model';

import { guildsTable } from '@/api/src/db/schema';

export abstract class GuildService {
  static async createGuild({ guildId, guildName, db }: GuildModel.createBody) {
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
}

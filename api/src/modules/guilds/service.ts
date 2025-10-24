import type {
  CreateServiceParams,
  RetrieveBody,
} from '@/api/src/modules/guilds/model';

import { guildsTable } from '@/api/src/db/schema';
import { eq } from 'drizzle-orm';

export abstract class GuildService {
  static async createGuild({ guildId, guildName, db }: CreateServiceParams) {
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
  }

  static async getGuildById({ guildId, db }: RetrieveBody) {
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

import type { Database } from '@/api/src/core/database';
import type {
  CreateServiceParams,
  RetrieveBody,
} from '@/api/src/modules/guilds/model';

import { guildsTable } from '@/api/src/db/schema';
import { eq } from 'drizzle-orm';

export class GuildService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createGuild({ guildId, guildName }: CreateServiceParams) {
    try {
      await this.db
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

  async getGuildById(guildId: RetrieveBody) {
    try {
      const guild = await this.db
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

import type { Database } from '@/api/core/database';
import type {
  CreateGuildServiceParams,
  UpdateGuildServiceParams,
} from '@/api/modules/guilds/model';

import { guildKeywordsTable, guildsTable } from '@/api/db/schema';
import { eq } from 'drizzle-orm';

const DEFAULT_GUILD_LIMIT = 20;

export class GuildService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createGuild({ guildId, guildName }: CreateGuildServiceParams) {
    try {
      await this.db
        .insert(guildsTable)
        .values({
          name: guildName,
          guildId,
        })
        .execute();

      await this.db
        .insert(guildKeywordsTable)
        .values({
          guildId,
        })
        .execute();
    } catch (error) {
      throw new Error(`Failed to create guild: ${error}`);
    }
  }

  async getGuildById(guildId: string) {
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

  async getAllGuilds() {
    try {
      const guilds = await this.db
        .select()
        .from(guildsTable)
        .limit(DEFAULT_GUILD_LIMIT)
        .execute();

      return guilds;
    } catch (error) {
      throw new Error(`Failed to retrieve guilds: ${error}`);
    }
  }

  async updateGuildName({ guildId, newName }: UpdateGuildServiceParams) {
    try {
      await this.db
        .update(guildsTable)
        .set({ name: newName, updatedAt: new Date() })
        .where(eq(guildsTable.guildId, guildId))
        .execute();
    } catch (error) {
      throw new Error(`Failed to update guild name: ${error}`);
    }
  }

  async deleteGuildById(guildId: string) {
    try {
      await this.db
        .delete(guildsTable)
        .where(eq(guildsTable.guildId, guildId))
        .execute();
    } catch (error) {
      throw new Error(`Failed to delete guild: ${error}`);
    }
  }
}

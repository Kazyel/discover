import type { Database } from '@/api/core/database';
import type {
  CreateKeywordServiceParams,
  Keywords,
} from '@/api/modules/keywords/model';

import { guildKeywordsTable } from '@/api/db/schema';
import { eq } from 'drizzle-orm';

export class KeywordsService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getKeywordsByGuildId(guildId: string): Promise<Keywords[]> {
    try {
      const keywords = await this.db
        .select()
        .from(guildKeywordsTable)
        .where(eq(guildKeywordsTable.guildId, guildId))
        .execute();

      return keywords;
    } catch (error) {
      throw new Error(`Failed to retrieve keywords: ${error}`);
    }
  }

  async setKeywords({ guildId, keywords }: CreateKeywordServiceParams) {
    try {
      await this.db
        .update(guildKeywordsTable)
        .set({
          ...keywords,
        })
        .where(eq(guildKeywordsTable.guildId, guildId))
        .execute();
    } catch (error) {
      throw new Error(`Failed to create keyword: ${error}`);
    }

    return { message: 'Keyword created' };
  }
}

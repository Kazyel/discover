import type { Database } from '@/api/core/database';
import type { Keywords } from '@/api/modules/keywords/model';

export class KeywordsService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async retrieveKeywords(guildId: string) {
    return [];
  }

  async createKeyword(guildId: string, keywords: Keywords) {
    return { message: 'Keyword created' };
  }
}

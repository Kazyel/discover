import { describe, expect, it } from 'bun:test';
import Undici from 'undici';

const URL = 'http://localhost:3000/api/v1/guilds/';
const MOCK_GUILD_INFO = {
  guildId: '123456789012345678',
  guildName: 'Example Guild',
};

describe('Guild API Endpoints', () => {
  it('should create and then delete a guild successfully', async () => {
    const createResult = await Undici.request(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(MOCK_GUILD_INFO),
    });

    expect(createResult.statusCode).toBe(201);

    const deleteResult = await Undici.request(URL + MOCK_GUILD_INFO.guildId, {
      method: 'DELETE',
    });

    expect(deleteResult.statusCode).toBe(200);
  });
});

import type { Listener } from '@/bot/lib/types';
import { Events, Guild, type Client } from 'discord.js';
import Undici from 'undici';

/**
 * Revisit this file to handle errors and edge cases properly.
 */

export class GuildEventListener implements Listener {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  private async handleGuildCreate(guild: Guild) {
    try {
      const guildInfo = {
        guildId: guild.id,
        guildName: guild.name,
      };

      await Undici.request('http://api:3000/api/v1/guilds/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guildInfo),
      });
    } catch (error) {
      console.error('Error processing guild creation:', error);
    }
  }

  private async handleGuildDelete(guild: Guild) {
    console.log(`Guild deleted: ${guild.name}`);
    console.log({
      id: guild.id,
      name: guild.name,
    });
  }

  private async handleGuildUpdate(newGuild: Guild) {
    try {
      await Undici.request(`http://api:3000/api/v1/guilds/${newGuild.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guildName: newGuild.name }),
      });
    } catch (error) {
      console.error('Error updating guild name in API:', error);
    }
  }

  public register(): void {
    this.client.once(Events.GuildCreate, async (guild) =>
      this.handleGuildCreate(guild),
    );

    this.client.once(Events.GuildDelete, (guild) =>
      this.handleGuildDelete(guild),
    );

    this.client.on(Events.GuildUpdate, async (_, newGuild) =>
      this.handleGuildUpdate(newGuild),
    );
  }
}

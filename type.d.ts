import type { Collection } from 'discord.js';
import type { Command } from './bot/modules/commands/slash';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}

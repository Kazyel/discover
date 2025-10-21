import type { Collection } from 'discord.js';
import type { Command } from './bot/commands';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}

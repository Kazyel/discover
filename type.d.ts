import type { Collection } from 'discord.js';
import type { Command } from './bot/commands';
import type { Logger } from '@bogeychan/elysia-logger/types';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}

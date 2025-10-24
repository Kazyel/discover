import {
  ChatInputCommandInteraction,
  Collection,
  InteractionResponse,
  SlashCommandBuilder,
  type Client,
} from 'discord.js';

import { REST, Routes } from 'discord.js';

import check_connection from './commands/check_connection';
import save_guild from './commands/save_guild';

export type Command = {
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
  ) => Promise<InteractionResponse>;
};

const commands = {
  check_connection,
  save_guild,
};

class CommandsInitializer {
  public deploy = async () => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const GUILD_ID = process.env.GUILD_ID;
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

    if (!DISCORD_TOKEN) {
      throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
    }
    if (!CLIENT_ID) {
      throw new Error('CLIENT_ID environment variable is not set.');
    }
    if (!GUILD_ID) {
      throw new Error('GUILD_ID environment variable is not set.');
    }

    const commandsData = Object.values(commands).map((command) => command.data);
    const rest = new REST().setToken(DISCORD_TOKEN);

    (async () => {
      try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
          body: commandsData,
        });

        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    })();
  };

  public initialize(client: Client) {
    client.commands = new Collection();

    for (const commandName in commands) {
      const command = commands[commandName as keyof typeof commands];
      client.commands.set(command.data.name, command);
    }
  }
}

export default CommandsInitializer;

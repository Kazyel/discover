import {
  ChatInputCommandInteraction,
  Collection,
  Events,
  InteractionResponse,
  MessageFlags,
  SlashCommandBuilder,
  type Client,
} from 'discord.js';

import { REST, Routes } from 'discord.js';

import ping from './commands/utility/ping';
import add from './commands/utility/add';

export type Command = {
  data: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
  ) => Promise<InteractionResponse<boolean>>;
};

const commands = {
  ping,
  add,
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

    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral,
          });
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    });
  }
}

export default CommandsInitializer;

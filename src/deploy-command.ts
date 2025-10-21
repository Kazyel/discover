import { REST, Routes } from 'discord.js';
import { commands } from '@/commands/commands';

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

export async function deployCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
      body: commandsData,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

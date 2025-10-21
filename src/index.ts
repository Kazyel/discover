import { Client, Events, GatewayIntentBits } from 'discord.js';

import Commands from '@/commands';

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new Commands();

if (!token) {
  throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
commands.deploy();
commands.initialize(client);

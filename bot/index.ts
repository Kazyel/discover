import { Client, Events, GatewayIntentBits } from 'discord.js';

import { KeywordsModalListener } from '@/bot/modules/keywords/keywords-modal-listener';
import { GuildEventListener } from '@/bot/modules/guilds/guild-event-listener';
import { CommandListener } from '@/bot/modules/commands/command-listener';
import { CommandRegister } from '@/bot/modules/commands/command-register';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new CommandRegister();

const commandsListener = new CommandListener(client);
const guildsListener = new GuildEventListener(client);
const keywordsListener = new KeywordsModalListener(client);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

commands.deploy();

commandsListener.register();
guildsListener.register();
keywordsListener.register();

commands.register(client);

client.login(token);

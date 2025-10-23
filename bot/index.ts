import { Client, Events, GatewayIntentBits } from 'discord.js';

import CommandsInitializer from './commands';
import Undici from 'undici';

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new CommandsInitializer();

if (!token) {
  throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.once(Events.GuildCreate, async (guild) => {
  try {
    const guildInfo = {
      guildId: guild.id,
      guildName: guild.name,
    };

    const result = await Undici.request('http://api:3000/api/v1/guild/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guildInfo),
    });

    const data = await result.body.json();
    console.log('Guild creation reported to API:', data);
  } catch (error) {
    console.error('Error processing guild creation:', error);
  }
});

client.once(Events.GuildDelete, (guild) => {
  console.log(`Guild deleted: ${guild.name}`);
  console.log({
    id: guild.id,
    name: guild.name,
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  await interaction.deferReply();

  if (commandName === 'ping') {
    try {
      const result = await Undici.request(`http://api:3000/api/v1/guild/`);
      const data = await result.body.json();
      await interaction.editReply({ content: JSON.stringify(data) });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await interaction.editReply({ content: 'Error fetching data from API.' });
    }
  }
});

commands.deploy();
commands.initialize(client);

client.login(token);

import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import Undici from 'undici';

import CommandRegister from '@/bot/commands';
import { keywordsModal, whereModal } from '@/bot/modals/modals';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('DISCORD_BOT_TOKEN environment variable is not set.');
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new CommandRegister();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.once(Events.GuildCreate, async (guild) => {
  try {
    const guildInfo = {
      guildId: guild.id,
      guildName: guild.name,
    };

    const result = await Undici.request('http://api:3000/api/v1/guilds/', {
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

client.on(Events.GuildUpdate, async (oldGuild, newGuild) => {
  console.log(`Guild updated: ${oldGuild.name} -> ${newGuild.name}`);
  try {
    const result = await Undici.request(
      `http://api:3000/api/v1/guilds/${newGuild.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guildName: newGuild.name }),
      },
    );

    if (result.statusCode === 200) {
      const data = await result.body.json();
      console.log('Guild update reported to API:', data);
      return;
    }
  } catch (error) {
    console.error('Error updating guild name in API:', error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if (commandName === 'set_keywords') {
    try {
      await interaction.showModal(keywordsModal);
    } catch (error) {
      console.error('Error showing modal:', error);
      await interaction.reply({
        content: 'Error showing modal.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if (commandName === 'set_where') {
    try {
      await interaction.showModal(whereModal);
    } catch (error) {
      console.error('Error showing modal:', error);
      await interaction.reply({
        content: 'Error showing modal.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if (commandName === 'check_connection') {
    try {
      const result = await Undici.request(`http://api:3000/api/v1/guilds/`);
      const data = await result.body.json();
      await interaction.reply({ content: JSON.stringify(data) });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await interaction.reply({
        content: 'Error fetching data from API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if (commandName === 'retrieve_guild') {
    try {
      const guildId = interaction.guild?.id;
      const result = await Undici.request(
        `http://api:3000/api/v1/guilds/${guildId}`,
      );
      const data = await result.body.json();
      await interaction.reply({ content: JSON.stringify(data) });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await interaction.reply({
        content: 'Error fetching data from API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if (commandName === 'save_guild') {
    try {
      const { statusCode, body } = await Undici.request(
        `http://api:3000/api/v1/guilds/`,
        {
          method: 'POST',
          body: JSON.stringify({
            guildId: interaction.guild?.id,
            guildName: interaction.guild?.name,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (statusCode === 200) {
        await interaction.reply({ content: 'Guild saved successfully.' });
        return;
      }

      const responseBody = await body.text();

      await interaction.reply({
        content: `Failed to save guild. [Status: ${statusCode}] - Error: ${responseBody}`,
      });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await interaction.reply({
        content: 'Error fetching data from API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

commands.deploy();
commands.register(client);
client.login(token);

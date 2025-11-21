import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import Undici from 'undici';

import CommandRegister from '@/bot/commands';
import {
  keywordsModal,
  whereModal,
  type AvailableModals,
} from '@/bot/modals/modals';

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
      return;
    }
  } catch (error) {
    console.error('Error updating guild name in API:', error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  const { customId } = interaction;
  const guildId = interaction.guild?.id;

  if ((customId as AvailableModals) === 'setKeywordsModal') {
    const whatInput = interaction.fields.getTextInputValue('whatInput');
    const whatAndInput = interaction.fields.getTextInputValue('whatAndInput');
    const whatOrInput = interaction.fields.getTextInputValue('whatOrInput');
    const whatExcludeInput =
      interaction.fields.getTextInputValue('whatExcludeInput');
    const titleOnlyInput =
      interaction.fields.getTextInputValue('titleOnlyInput');

    if (
      whatInput.length === 0 &&
      whatAndInput.length === 0 &&
      whatOrInput.length === 0 &&
      whatExcludeInput.length === 0 &&
      titleOnlyInput.length === 0
    ) {
      await interaction.reply({
        content:
          'Nothing was provided. Please provide at least one keyword input.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const requestBody = {
      what: whatInput.length > 0 ? whatInput : undefined,
      what_and: whatAndInput.length > 0 ? whatAndInput : undefined,
      what_or: whatOrInput.length > 0 ? whatOrInput : undefined,
      what_exclude: whatExcludeInput.length > 0 ? whatExcludeInput : undefined,
      title_only: titleOnlyInput.length > 0 ? titleOnlyInput : undefined,
    };

    try {
      const { statusCode, body } = await Undici.request(
        `http://api:3000/api/v1/guilds/${guildId}/keywords`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      const data = await body.json();

      if (statusCode !== 200) {
        await interaction.reply({
          content: `Failed to set keywords. [Status: ${statusCode}] [Body: ${JSON.stringify(data)}]`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      await interaction.reply({
        content: 'Search keywords set successfully.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    } catch (error) {
      await interaction.reply({
        content: 'Error submitting form to the API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  if ((customId as AvailableModals) === 'setWhereModal') {
    const whereInput = interaction.fields.getTextInputValue('whereInput');
    const distanceInput = interaction.fields.getTextInputValue('distanceInput');
    const countryInput = interaction.fields.getTextInputValue('countryInput');

    if (
      whereInput.length === 0 &&
      distanceInput.length === 0 &&
      countryInput.length === 0
    ) {
      await interaction.reply({
        content:
          'Nothing was provided. Please provide at least one location input.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (distanceInput.length > 0 && isNaN(Number(distanceInput))) {
      await interaction.reply({
        content: 'Distance must be a valid number.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (countryInput.length > 0 && countryInput.length !== 2) {
      await interaction.reply({
        content: 'Country code must be a valid 2-letter ISO code.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const requestBody = {
      where: whereInput.length > 0 ? whereInput : undefined,
      distance: distanceInput.length > 0 ? Number(distanceInput) : undefined,
      country: countryInput.length > 0 ? countryInput : undefined,
    };

    try {
      const { statusCode, body } = await Undici.request(
        `http://api:3000/api/v1/guilds/${guildId}/keywords`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      const data = await body.json();

      if (statusCode !== 200) {
        await interaction.reply({
          content: `Failed to set keywords. [Status: ${statusCode}] [Body: ${JSON.stringify(data)}]`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      await interaction.reply({
        content: 'Location keywords set successfully.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    } catch (error) {
      await interaction.reply({
        content: 'Error submitting form to the API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if (commandName === 'set_keywords') {
    try {
      await interaction.showModal(keywordsModal);
    } catch (error) {
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
      await interaction.reply({
        content: 'Error showing modal.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // Check connection to the API (REMOVE LATER)
  if (commandName === 'check_connection') {
    try {
      const result = await Undici.request(`http://api:3000/api/v1/guilds/`);

      const data = await result.body.json();

      await interaction.reply({ content: JSON.stringify(data) });
    } catch (error) {
      await interaction.reply({
        content: 'Error fetching data from API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // Retrieve guild info from the API
  if (commandName === 'retrieve_guild') {
    try {
      const guildId = interaction.guild?.id;
      const result = await Undici.request(
        `http://api:3000/api/v1/guilds/${guildId}`,
      );

      const data = await result.body.json();

      await interaction.reply({ content: JSON.stringify(data) });
    } catch (error) {
      await interaction.reply({
        content: 'Error fetching data from API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // Save guild info to the API
  if (commandName === 'save_guild') {
    try {
      const { statusCode } = await Undici.request(
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

      if (statusCode !== 201) {
        await interaction.reply({
          content: `Failed to save guild. [Status: ${statusCode}] `,
          flags: MessageFlags.Ephemeral,
        });
      }

      await interaction.reply({ content: 'Guild saved successfully.' });
    } catch (error) {
      await interaction.reply({
        content: 'Error submitting data to the API.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

commands.deploy();
commands.register(client);
client.login(token);

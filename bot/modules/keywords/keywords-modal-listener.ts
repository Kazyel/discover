import type { Listener } from '@/bot/lib/types';
import type { AvailableModals } from '@/bot/lib/utils/modals';
import {
  type Client,
  Events,
  MessageFlags,
  ModalSubmitInteraction,
} from 'discord.js';
import Undici from 'undici';

export class KeywordsModalListener implements Listener {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  private async handleSearchModalSubmit(
    interaction: ModalSubmitInteraction,
    guildId: string,
  ) {
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

  private async handleWhereModalSubmit(
    interaction: ModalSubmitInteraction,
    guildId: string,
  ) {
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
      country: countryInput.length > 0 ? countryInput.toLowerCase() : undefined,
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

  public register() {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      const { customId } = interaction;
      const guildId = interaction.guild?.id;

      if ((customId as AvailableModals) === 'setKeywordsModal')
        this.handleSearchModalSubmit(interaction, guildId!);

      if ((customId as AvailableModals) === 'setWhereModal')
        this.handleWhereModalSubmit(interaction, guildId!);
    });
  }
}

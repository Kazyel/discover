import {
  type Client,
  ChatInputCommandInteraction,
  Events,
  MessageFlags,
} from 'discord.js';

import Undici from 'undici';
import { keywordsModal, whereModal } from '@/bot/lib/utils/modals';
import type { Listener } from '@/bot/lib/types';

export class CommandListener implements Listener {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async handleSetKeywordsCommand(
    interaction: ChatInputCommandInteraction,
  ) {
    try {
      await interaction.showModal(keywordsModal);
    } catch (error) {
      await interaction.reply({
        content: 'Error showing modal.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  public async handleSetWhereCommand(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.showModal(whereModal);
    } catch (error) {
      await interaction.reply({
        content: 'Error showing modal.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  public register(): void {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const { commandName } = interaction;

      switch (commandName) {
        case 'set_keywords':
          this.handleSetKeywordsCommand(interaction);
          break;
        case 'set_where':
          this.handleSetWhereCommand(interaction);
          break;
        case 'check_connection':
          try {
            const result = await Undici.request(
              `http://api:3000/api/v1/guilds/`,
            );

            const data = await result.body.json();

            await interaction.reply({ content: JSON.stringify(data) });
          } catch (error) {
            await interaction.reply({
              content: 'Error fetching data from API.',
              flags: MessageFlags.Ephemeral,
            });
          }
          break;
        default:
          return;
      }
    });
  }
}

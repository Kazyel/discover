import type { Command } from '@/bot/commands';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('check_connection')
  .setDescription("Checks the bot's connection to the API.");

export async function execute(interaction: ChatInputCommandInteraction) {
  return interaction.reply('Pong!');
}

export default { data, execute } as Command;

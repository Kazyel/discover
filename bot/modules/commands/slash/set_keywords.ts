import type { Command } from '@/bot/commands';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('set_keywords')
  .setDescription('Sets the keywords to search for (server specific).');

export async function execute(interaction: ChatInputCommandInteraction) {
  return interaction.reply('Pong!');
}

export default { data, execute } as Command;

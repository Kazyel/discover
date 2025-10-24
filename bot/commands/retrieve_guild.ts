import type { Command } from '@/bot/commands';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('retrieve_guild')
  .setDescription('Retrieves the guild information from the database.');

export async function execute(interaction: ChatInputCommandInteraction) {
  return interaction.reply('Pong');
}

export default { data, execute } as Command;

import type { Command } from '@/bot/commands';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('save_guild')
  .setDescription('Saves the guild information to the database.');

export async function execute(interaction: ChatInputCommandInteraction) {
  return interaction.reply('Pong');
}

export default { data, execute } as Command;

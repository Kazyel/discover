import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('add')
  .setDescription('Adds two numbers')
  .addIntegerOption((option) =>
    option
      .setName('first')
      .setDescription('The first number to add')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('second')
      .setDescription('The second number to add')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const firstNumber = interaction.options.getInteger('first');
  const secondNumber = interaction.options.getInteger('second');

  if (firstNumber === null || secondNumber === null) {
    return interaction.reply('Please provide two numbers to add.');
  }

  const sum = firstNumber + secondNumber;
  return interaction.reply(
    `The sum of ${firstNumber} and ${secondNumber} is ${sum}.`
  );
}

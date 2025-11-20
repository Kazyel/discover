import { LabelBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const inputBuilder = (id: string, required: boolean) => {
  return new TextInputBuilder()
    .setCustomId(id)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(100)
    .setRequired(required);
};

export const labelBuilder = (
  label: string,
  description: string,
  component: TextInputBuilder,
) => {
  return new LabelBuilder({
    label,
  })
    .setDescription(description)
    .setTextInputComponent(component);
};

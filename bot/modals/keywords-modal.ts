import {
  LabelBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

const inputBuilder = (id: string, required: boolean) => {
  return new TextInputBuilder()
    .setCustomId(id)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(100)
    .setRequired(required);
};

const labelBuilder = (
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

const whatInput = inputBuilder('whatInput', false);
const whatAndInput = inputBuilder('whatAndInput', false);
const whatOrInput = inputBuilder('whatOrInput', false);
const whatExcludeInput = inputBuilder('whatExcludeInput', false);
const titleOnlyInput = inputBuilder('titleOnlyInput', false);
const whereInput = inputBuilder('whereInput', false);
const disctanceInput = inputBuilder('distanceInput', false);

const whatInputLabel = labelBuilder(
  'Keywords',
  'The keywords to search for. Multiple terms may be space separated.',
  whatInput,
);

const whatAndInputLabel = labelBuilder(
  'Must have keywords',
  'The keywords to search for, all keywords must be found.',
  whatAndInput,
);

const whatOrInputLabel = labelBuilder(
  'Optional keywords',
  'The keywords to search for, any keywords may be found. Multiple terms may be space separated.',
  whatOrInput,
);

const whatExcludeInputLabel = labelBuilder(
  'Exclude keywords',
  'Keywords to exclude from the search. Multiple terms may be space separated.',
  whatExcludeInput,
);

const titleOnlyInputLabel = labelBuilder(
  'Search in titles only',
  'Keywords to find, but only in the title. Multiple terms may be space separated.',
  titleOnlyInput,
);

// const whereInputLabel = labelBuilder(
//   'Location',
//   'The geographic centre of the search. Place names, postal codes, etc. may be used.',
//   whereInput,
// );

// const distanceInputLabel = labelBuilder(
//   'Distance',
//   'The distance in kilometres from the location. Defaults to 5km.',
//   disctanceInput,
// );

const keywordsModal = new ModalBuilder()
  .setCustomId('setKeywordsModal')
  .setTitle('Set Keywords')
  .addLabelComponents(
    whatInputLabel,
    whatAndInputLabel,
    whatOrInputLabel,
    whatExcludeInputLabel,
    titleOnlyInputLabel,
    // whereInputLabel,
    // distanceInputLabel,
  );

export default keywordsModal;

import { inputBuilder, labelBuilder } from '@/bot/lib/utils/modal-builders';

const whatInput = inputBuilder('whatInput', false);
const whatAndInput = inputBuilder('whatAndInput', false);
const whatOrInput = inputBuilder('whatOrInput', false);
const whatExcludeInput = inputBuilder('whatExcludeInput', false);
const titleOnlyInput = inputBuilder('titleOnlyInput', false);

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

export default {
  whatInputLabel,
  whatAndInputLabel,
  whatOrInputLabel,
  whatExcludeInputLabel,
  titleOnlyInputLabel,
};

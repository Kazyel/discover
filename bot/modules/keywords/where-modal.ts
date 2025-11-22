import { inputBuilder, labelBuilder } from '@/bot/lib/utils/modal-builders';

const whereInput = inputBuilder('whereInput', false);
const distanceInput = inputBuilder('distanceInput', false);
const countryInput = inputBuilder('countryInput', false);

const whereInputLabel = labelBuilder(
  'Location',
  'The geographic centre of the search. Place names, postal codes, etc. may be used.',
  whereInput,
);

const countryInputLabel = labelBuilder(
  'Country',
  'The country for the search location. Must be a 2-letter country code (e.g., US, GB, CA).',
  countryInput,
);

const distanceInputLabel = labelBuilder(
  'Distance',
  'The distance in kilometres from the location. Defaults to 5km.',
  distanceInput,
);

export default {
  whereInputLabel,
  distanceInputLabel,
  countryInputLabel,
};

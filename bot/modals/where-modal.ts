import { inputBuilder, labelBuilder } from '@/bot/modals/builders';

const whereInput = inputBuilder('whereInput', false);
const disctanceInput = inputBuilder('distanceInput', false);

const whereInputLabel = labelBuilder(
  'Location',
  'The geographic centre of the search. Place names, postal codes, etc. may be used.',
  whereInput,
);

const distanceInputLabel = labelBuilder(
  'Distance',
  'The distance in kilometres from the location. Defaults to 5km.',
  disctanceInput,
);

export default {
  distanceInputLabel,
  whereInputLabel,
};

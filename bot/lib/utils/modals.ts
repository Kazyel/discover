import { ModalBuilder } from 'discord.js';

import keywords from '@/bot/modules/keywords/keywords-modal';
import where from '@/bot/modules/keywords/where-modal';

export const keywordsModal = new ModalBuilder()
  .setCustomId('setKeywordsModal')
  .setTitle('Set Keywords')
  .addLabelComponents([...Object.values(keywords)]);

export const whereModal = new ModalBuilder()
  .setCustomId('setWhereModal')
  .setTitle('Set Where')
  .addLabelComponents([...Object.values(where)]);

export type AvailableModals = 'setKeywordsModal' | 'setWhereModal';

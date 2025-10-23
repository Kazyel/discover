import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import type { Elysia } from 'elysia';

import { API } from '@/api/src/models/api';
import { Database } from '@/api/src/models/database';
import { guild } from './modules/guilds';

const routes = (api: Elysia<'/api/v1'>) => {
  api.use(guild);
};

const initialize = async () => {
  const api = new API().start();
  const db = new Database<NeonHttpDatabase>();

  routes(api);
};

initialize();

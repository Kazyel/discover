import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { API } from '@/api/src/models/api';
import { Database } from '@/api/src/models/database';
import { guildsRoute } from './modules/guilds';

const db = new Database<NeonHttpDatabase>();
const server = new API({ prefix: '/api/v1', port: 3000 }, db);

server.addRoute(guildsRoute);

export const app = await server.start();

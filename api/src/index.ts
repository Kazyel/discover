import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { API } from '@/api/src/models/api';
import { Database } from '@/api/src/models/database';
import { guild } from './modules/guilds';

const server = new API({ prefix: '/api/v1' });
const db = new Database<NeonHttpDatabase>();

server.decorate('db', db);
server.addRoute(guild);

export const app = await server.start();

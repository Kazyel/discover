import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { API } from '@/api/src/core/api';
import { Database } from '@/api/src/core/database';
import { guildsRoute } from './modules/guilds';

const database = new Database<NeonHttpDatabase>();
const server = new API({ prefix: '/api/v1', port: 3000 }, database);

server.addRoute(guildsRoute);
await server.start();

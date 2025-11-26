import { API } from '@/api/core/api';
import { db } from '@/api/core/database';

import { guildsRoute } from '@/api/modules/guilds';
import { adzunaRoute } from './modules/adzuna';

const server = new API({ prefix: '/api/v1', port: 3000 }, db);

server.addRoute(guildsRoute);
server.addRoute(adzunaRoute);

try {
  await server.start();
} catch (error) {
  console.error('Error starting server:', error);
}

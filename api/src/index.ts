import { API } from '@/api/src/core/api';
import { db } from '@/api/src/core/database';

import { guildsRoute } from './modules/guilds';
import { keywordsRoute } from './modules/keywords';

const server = new API({ prefix: '/api/v1', port: 3000 }, db);

server.addRoute(guildsRoute);

try {
  await server.start();
} catch (error) {
  console.error('Error starting server:', error);
}

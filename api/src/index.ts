import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import { API } from '@/api/src/models/api';
import { Database } from '@/api/src/models/database';

const initialize = async () => {
  const apiInstance = new API();
  const db = new Database<NeonHttpDatabase>();
  apiInstance.start();
};

initialize();

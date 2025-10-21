import { API } from '@/api/src/models/app-instance';
import { DatabaseInstance } from '@/api/src/models/database-instance';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

const initialize = async () => {
  const { init } = new API();
  const { database } = new DatabaseInstance<NeonHttpDatabase>();

  init(database);
};

initialize();

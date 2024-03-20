import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './db.interface';

import * as schema from './schemas';

ConfigModule.forRoot();

export default {
  tag: 'db',
  pg: {
    connection: 'client',
    config: {
      host: process.env.DB_HOST!,
      port: +process.env.DB_PORT!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
    },
  },
  config: { schema: { ...schema } },
} as DbConfig;

import { config } from 'dotenv';

import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/database/migrations/schema.ts',

  out: './src/database/migrations',

  dialect: 'postgresql',

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

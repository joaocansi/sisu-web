import { config } from "dotenv";

import { drizzle, NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
config({ path: ".env" });

let db: NodePgDatabase<Record<string, never>> & {
    $client: NodePgClient;
}

if (process.env.NODE_ENV === 'production') {
  db = drizzle(process.env.DATABASE_URL!)
} else {
  if (!global.db) {
    global.db = drizzle(process.env.DATABASE_URL!)
  }
  db = global.db
}

export default db
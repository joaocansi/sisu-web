/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';

declare global {
  var db: NodePgDatabase<Record<string, never>> & { $client: NodePgClient };
}

/* eslint-disable import/prefer-default-export */
import db from '@/database';
import { instituicoes } from '@/database/migrations/schema';

export async function GET() {
  const data = await db.select().from(instituicoes);
  return Response.json({
    hello: data,
  });
}

import db from '@/database'

import { institucoes } from "@/database/schema";

export async function GET() {
    const data = await db.select().from(institucoes);
    return Response.json({
        hello: data
    })
}
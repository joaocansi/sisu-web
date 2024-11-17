/* eslint-disable import/prefer-default-export */
import db from '@/database';
import { ofertaNotas } from '@/database/migrations/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const field = searchParams.get('field');

  if (!field) {
    return NextResponse.json(
      { error: 'Missing "field" query parameter.' },
      { status: 400 },
    );
  }

  if (field === 'nu_mod_concorrencia') {
    const data = await db
      .selectDistinctOn([ofertaNotas.nuModConcorrencia], {
        nu_mod_concorrencia: ofertaNotas.nuModConcorrencia,
      })
      .from(ofertaNotas);
    return NextResponse.json(data, { status: 200 });
  }

  return NextResponse.json(
    { message: `Field value is: ${field}` },
    { status: 200 },
  );
}

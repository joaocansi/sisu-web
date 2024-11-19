'use server';

import db from '@/database';
import {
  cursos,
  instituicaoLocalizacoesUf,
  ofertas,
} from '@/database/migrations/schema';
import { and, eq } from 'drizzle-orm';

type QuerySearch = {
  field: string;
  where: {
    [key: string]: number;
  };
};

type SearchKeyValue = {
  key: number;
  value: string;
}[];

export default async function search(
  query: QuerySearch,
): Promise<SearchKeyValue> {
  if (query.field === 'no_curso') {
    const queryBuilder = db
      .selectDistinctOn([cursos.coCurso], {
        key: cursos.coCurso,
        value: cursos.noCurso,
      })
      .from(cursos);

    if (query.where.sg_uf && query.where.sg_uf !== 0) {
      queryBuilder
        .innerJoin(ofertas, eq(ofertas.coCurso, cursos.coCurso))
        .innerJoin(
          instituicaoLocalizacoesUf,
          and(
            eq(
              instituicaoLocalizacoesUf.coIesUfLocalizacao,
              ofertas.coIesUfLocalizacao,
            ),
            eq(instituicaoLocalizacoesUf.coIesUfLocalizacao, query.where.sg_uf),
          ),
        );
    }

    return queryBuilder;
  }
  if (query.field === 'sg_uf') {
    const queryBuilder = db
      .selectDistinctOn([instituicaoLocalizacoesUf.coIesUfLocalizacao], {
        key: instituicaoLocalizacoesUf.coIesUfLocalizacao,
        value: instituicaoLocalizacoesUf.sgUf,
      })
      .from(instituicaoLocalizacoesUf);

    if (query.where.no_curso && query.where.no_curso !== 0) {
      queryBuilder
        .innerJoin(
          ofertas,
          eq(
            ofertas.coIesUfLocalizacao,
            instituicaoLocalizacoesUf.coIesUfLocalizacao,
          ),
        )
        .innerJoin(
          cursos,
          and(
            eq(cursos.coCurso, ofertas.coCurso),
            eq(cursos.coCurso, query.where.no_curso),
          ),
        );
    }

    return queryBuilder;
  }
  return [];
}

/* eslint-disable @typescript-eslint/no-use-before-define */

'use server';

import db from '@/database';
import {
  cursos,
  instituicaoLocalizacoes,
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

/**
 * Performs a search query based on the provided field and conditions.
 * @param query The search criteria including the field and filtering conditions.
 * @returns An array of key-value pairs for the search result.
 */
export default async function search(
  query: QuerySearch,
): Promise<SearchKeyValue> {
  switch (query.field) {
    case 'no_curso':
      return searchByCourse(query.where);

    case 'sg_uf':
      return searchByUf(query.where);

    case 'no_municipio':
      return searchByMunicipio(query.where);

    default:
      return [];
  }
}

/**
 * Search logic for the 'no_curso' field.
 * @param where Conditions for filtering the courses.
 * @returns The distinct courses matching the criteria.
 */
async function searchByCourse(where: {
  [key: string]: number;
}): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([cursos.coCurso], {
      key: cursos.coCurso,
      value: cursos.noCurso,
    })
    .from(cursos);

  if (where.sg_uf && where.sg_uf !== 0) {
    queryBuilder
      .innerJoin(ofertas, eq(ofertas.coCurso, cursos.coCurso))
      .innerJoin(
        instituicaoLocalizacoesUf,
        and(
          eq(
            instituicaoLocalizacoesUf.coIesUfLocalizacao,
            ofertas.coIesUfLocalizacao,
          ),
          eq(instituicaoLocalizacoesUf.coIesUfLocalizacao, where.sg_uf),
        ),
      );
  }

  return queryBuilder;
}

/**
 * Search logic for the 'sg_uf' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByUf(where: {
  [key: string]: number;
}): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicaoLocalizacoesUf.coIesUfLocalizacao], {
      key: instituicaoLocalizacoesUf.coIesUfLocalizacao,
      value: instituicaoLocalizacoesUf.sgUf,
    })
    .from(instituicaoLocalizacoesUf);

  if (where.no_curso && where.no_curso !== 0) {
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
          eq(cursos.coCurso, where.no_curso),
        ),
      );
  }

  return queryBuilder;
}

/**
 * Search logic for the 'no_municipio' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByMunicipio(where: {
  [key: string]: number;
}): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicaoLocalizacoes.coIesLocalizacao], {
      key: instituicaoLocalizacoes.coIesLocalizacao,
      value: instituicaoLocalizacoes.noMunicipio,
    })
    .from(instituicaoLocalizacoes);

  if (where.sg_uf && where.sg_uf !== 0) {
    queryBuilder.innerJoin(
      instituicaoLocalizacoesUf,
      and(
        eq(
          instituicaoLocalizacoesUf.coIesUfLocalizacao,
          instituicaoLocalizacoes.coIesUfLocalizacao,
        ),
        eq(instituicaoLocalizacoesUf.coIesUfLocalizacao, where.sg_uf),
      ),
    );
  }

  if (where.no_curso && where.no_curso !== 0) {
    queryBuilder.innerJoin(
      ofertas,
      and(
        eq(ofertas.coIesLocalizacao, instituicaoLocalizacoes.coIesLocalizacao),
        eq(ofertas.coCurso, where.no_curso),
      ),
    );
  }

  return queryBuilder;
}

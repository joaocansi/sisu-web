/* eslint-disable @typescript-eslint/no-use-before-define */

'use server';

import db from '@/database';
import {
  cursos,
  instituicaoCampus,
  instituicaoLocalizacoes,
  instituicaoLocalizacoesUf,
  instituicoes,
  ofertas,
} from '@/database/migrations/schema';
import { and, eq } from 'drizzle-orm';

type QuerySearch = {
  field: string;
  where: QuerySearchWhere;
};

export type DynamicSearchKeyValue = {
  key: number;
  value: string;
};

type QuerySearchWhere = {
  [key: string]: DynamicSearchKeyValue | null;
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
    case 'co_curso':
      return searchByCourse();

    case 'co_ies_uf_localizacao':
      return searchByUf(query.where);

    case 'co_ies_localizacao':
      return searchByMunicipio(query.where);

    case 'co_ies':
      return searchByIes(query.where);

    case 'co_campus':
      return searchByCampus(query.where);

    default:
      return [];
  }
}

/**
 * Search logic for the 'co_curso' field.
 * @param where Conditions for filtering the courses.
 * @returns The distinct courses matching the criteria.
 */
async function searchByCourse(): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([cursos.coCurso], {
      key: cursos.coCurso,
      value: cursos.noCurso,
    })
    .from(cursos);

  return queryBuilder;
}

/**
 * Search logic for the 'co_ies_uf_localizacao' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByUf(where: QuerySearchWhere): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicaoLocalizacoesUf.coIesUfLocalizacao], {
      key: instituicaoLocalizacoesUf.coIesUfLocalizacao,
      value: instituicaoLocalizacoesUf.sgUf,
    })
    .from(instituicaoLocalizacoesUf);

  if (where.co_curso) {
    queryBuilder.innerJoin(
      ofertas,
      and(
        eq(
          ofertas.coIesUfLocalizacao,
          instituicaoLocalizacoesUf.coIesUfLocalizacao,
        ),
        eq(ofertas.coCurso, where.co_curso.key),
      ),
    );
  }

  return queryBuilder;
}

/**
 * Search logic for the 'co_ies_localizacao' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByMunicipio(
  where: QuerySearchWhere,
): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicaoLocalizacoes.coIesLocalizacao], {
      key: instituicaoLocalizacoes.coIesLocalizacao,
      value: instituicaoLocalizacoes.noMunicipio,
    })
    .from(instituicaoLocalizacoes);

  if (where.co_ies_uf_localizacao) {
    queryBuilder.where(
      eq(
        instituicaoLocalizacoes.coIesUfLocalizacao,
        where.co_ies_uf_localizacao.key,
      ),
    );
  }

  if (where.co_curso) {
    queryBuilder.innerJoin(
      ofertas,
      and(
        eq(ofertas.coIesLocalizacao, instituicaoLocalizacoes.coIesLocalizacao),
        eq(ofertas.coCurso, where.co_curso.key),
      ),
    );
  }

  return queryBuilder;
}

/**
 * Search logic for the 'co_ies_localizacao' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByIes(where: QuerySearchWhere): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicoes.noIes], {
      key: instituicoes.coIes,
      value: instituicoes.noIes,
    })
    .from(instituicoes);

  if (where.co_curso) {
    queryBuilder.innerJoin(
      ofertas,
      and(
        eq(ofertas.coIesLocalizacao, instituicoes.coIesLocalizacao),
        eq(ofertas.coCurso, where.co_curso.key),
      ),
    );
  }

  if (where.co_ies_localizacao) {
    queryBuilder.where(
      eq(instituicoes.coIesLocalizacao, where.co_ies_localizacao.key),
    );
    return queryBuilder;
  }

  if (where.co_ies_uf_localizacao) {
    queryBuilder.where(
      eq(instituicoes.coIesUfLocalizacao, where.co_ies_uf_localizacao.key),
    );
    return queryBuilder;
  }

  return queryBuilder;
}

/**
 * Search logic for the 'co_ies_localizacao' field.
 * @param where Conditions for filtering by state UF.
 * @returns The distinct state UFs matching the criteria.
 */
async function searchByCampus(
  where: QuerySearchWhere,
): Promise<SearchKeyValue> {
  const queryBuilder = db
    .selectDistinctOn([instituicaoCampus.coCampus], {
      key: instituicaoCampus.coCampus,
      value: instituicaoCampus.noCampus,
    })
    .from(instituicaoCampus);

  if (where.co_curso) {
    queryBuilder.innerJoin(
      ofertas,
      and(
        eq(ofertas.coCampus, instituicaoCampus.coCampus),
        eq(ofertas.coCurso, where.co_curso.key),
      ),
    );
  }

  if (where.co_ies) {
    queryBuilder.where(eq(instituicaoCampus.coIes, where.co_ies.key));
    return queryBuilder;
  }

  if (where.co_ies_localizacao) {
    queryBuilder.where(
      eq(instituicaoCampus.coIesLocalizacao, where.co_ies_localizacao.key),
    );
    return queryBuilder;
  }

  if (where.co_ies_uf_localizacao) {
    queryBuilder.where(
      eq(instituicaoCampus.coIesUfLocalizacao, where.co_ies_uf_localizacao.key),
    );
    return queryBuilder;
  }

  return queryBuilder;
}

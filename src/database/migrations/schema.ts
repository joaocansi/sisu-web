import {
  pgTable,
  integer,
  text,
  index,
  foreignKey,
  doublePrecision,
  serial,
  pgMaterializedView,
} from 'drizzle-orm/pg-core';

export const instituicoes = pgTable('instituicoes', {
  coIes: integer('co_ies').primaryKey().notNull(),
  coMunicipio: integer('co_municipio').notNull(),
  noIes: text('no_ies').notNull(),
  noMunicipio: text('no_municipio').notNull(),
  sgIes: text('sg_ies').notNull(),
  sgUf: text('sg_uf').notNull(),
});

export const instituicaoCampus = pgTable(
  'instituicao_campus',
  {
    coCampus: integer('co_campus').primaryKey().notNull(),
    coIes: integer('co_ies').notNull(),
    coMunicipioCampus: integer('co_municipio_campus').notNull(),
    noMunicipioCampus: text('no_municipio_campus').notNull(),
    noCampus: text('no_campus').notNull(),
    sgUfCampus: text('sg_uf_campus').notNull(),
  },
  (table) => {
    return {
      idxInstituicaoCampusCoIes: index('idx_instituicao_campus__co_ies').using(
        'btree',
        table.coIes.asc().nullsLast().op('int4_ops'),
      ),
      fkInstituicaoCampusCoIes: foreignKey({
        columns: [table.coIes],
        foreignColumns: [instituicoes.coIes],
        name: 'fk_instituicao_campus__co_ies',
      }).onDelete('cascade'),
    };
  },
);

export const ofertas = pgTable(
  'ofertas',
  {
    coOferta: integer('co_oferta').primaryKey().notNull(),
    coIes: integer('co_ies').notNull(),
    coCampus: integer('co_campus').notNull(),
    coCurso: integer('co_curso').notNull(),
    noGrau: text('no_grau').notNull(),
    noCurso: text('no_curso').notNull(),
    qtVagasSem1: integer('qt_vagas_sem1').notNull(),
    qtVagasSem2: integer('qt_vagas_sem2').notNull(),
    stTurnoM: integer('st_turno_m').notNull(),
    stTurnoV: integer('st_turno_v').notNull(),
    stTurnoN: integer('st_turno_n').notNull(),
    nuPesoCn: doublePrecision('nu_peso_cn').notNull(),
    nuPesoCh: doublePrecision('nu_peso_ch').notNull(),
    nuPesoM: doublePrecision('nu_peso_m').notNull(),
    nuPesoL: doublePrecision('nu_peso_l').notNull(),
    nuPesoR: doublePrecision('nu_peso_r').notNull(),
  },
  (table) => {
    return {
      idxOfertasCoCampus: index('idx_ofertas__co_campus').using(
        'btree',
        table.coCampus.asc().nullsLast().op('int4_ops'),
      ),
      idxOfertasCoIes: index('idx_ofertas__co_ies').using(
        'btree',
        table.coIes.asc().nullsLast().op('int4_ops'),
      ),
      fkOfertasCoCampus: foreignKey({
        columns: [table.coCampus],
        foreignColumns: [instituicaoCampus.coCampus],
        name: 'fk_ofertas__co_campus',
      }).onDelete('cascade'),
      fkOfertasCoIes: foreignKey({
        columns: [table.coIes],
        foreignColumns: [instituicoes.coIes],
        name: 'fk_ofertas__co_ies',
      }).onDelete('cascade'),
    };
  },
);

export const modConcorrencia = pgTable('mod_concorrencia', {
  coModConcorrencia: integer('co_mod_concorrencia').primaryKey().notNull(),
  noModConcorrencia: text('no_mod_concorrencia').notNull(),
});

export const ofertaNotas = pgTable(
  'oferta_notas',
  {
    id: serial().primaryKey().notNull(),
    coOferta: integer('co_oferta').notNull(),
    coModConcorrencia: integer('co_mod_concorrencia').notNull(),
    nuNotaMin: doublePrecision('nu_nota_min').notNull(),
    nuNotaMax: doublePrecision('nu_nota_max').notNull(),
  },
  (table) => {
    return {
      idxOfertaNotasCoModConcorrencia: index(
        'idx_oferta_notas__co_mod_concorrencia',
      ).using(
        'btree',
        table.coModConcorrencia.asc().nullsLast().op('int4_ops'),
      ),
      idxOfertaNotasCoOferta: index('idx_oferta_notas__co_oferta').using(
        'btree',
        table.coOferta.asc().nullsLast().op('int4_ops'),
      ),
      fkOfertaNotasCoModConcorrencia: foreignKey({
        columns: [table.coModConcorrencia],
        foreignColumns: [modConcorrencia.coModConcorrencia],
        name: 'fk_oferta_notas__co_mod_concorrencia',
      }).onDelete('cascade'),
      fkOfertaNotasCoOferta: foreignKey({
        columns: [table.coOferta],
        foreignColumns: [ofertas.coOferta],
        name: 'fk_oferta_notas__co_oferta',
      }).onDelete('cascade'),
    };
  },
);

export const estados = pgMaterializedView('estados').as((qb) => {
  return qb
    .selectDistinctOn([instituicoes.sgUf], { sg_uf: instituicoes.sgUf })
    .from(instituicoes);
});

export const municipios = pgMaterializedView('municipios').as((qb) => {
  return qb
    .selectDistinctOn([instituicaoCampus.coMunicipioCampus], {
      co_municipio_campus: instituicaoCampus.coMunicipioCampus,
      no_municipio_campus: instituicaoCampus.noMunicipioCampus,
      sg_uf_campus: instituicaoCampus.sgUfCampus,
    })
    .from(instituicaoCampus);
});

export const cursos = pgMaterializedView('cursos').as((qb) => {
  return qb
    .selectDistinctOn([ofertas.coCurso], {
      co_curso: ofertas.coCurso,
      no_curso: ofertas.noCurso,
    })
    .from(ofertas);
});

/* eslint-disable prettier/prettier */
import {
  pgTable,
  integer,
  text,
  index,
  foreignKey,
  serial,
  doublePrecision,
  pgMaterializedView,
} from 'drizzle-orm/pg-core';

export const instituicoes = pgTable('instituicoes', {
  coIes: integer('co_ies').primaryKey().notNull(),
  noIes: text('no_ies').notNull(),
  sgIes: text('sg_ies').notNull(),
  sgUf: text('sg_uf').notNull(),
  noMunicipio: text('no_municipio').notNull(),
});

export const instituicaoCampus = pgTable(
  'instituicao_campus',
  {
    coCampus: integer('co_campus').primaryKey().notNull(),
    noCampus: text('no_campus').notNull(),
    sgUfCampus: text('sg_uf_campus').notNull(),
    noMunicipioCampus: text('no_municipio_campus').notNull(),
    coIes: integer('co_ies').notNull(),
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
    coCampus: integer('co_campus').notNull(),
    coIes: integer('co_ies').notNull(),
    noCurso: text('no_curso').notNull(),
    qtVagasSem1: integer('qt_vagas_sem1').notNull(),
    qtVagasSem2: integer('qt_vagas_sem2').notNull(),
    noGrau: text('no_grau').notNull(),
    stTurnoM: text('st_turno_m').notNull(),
    stTurnoV: text('st_turno_v').notNull(),
    stTurnoN: text('st_turno_n').notNull(),
    nuPesoCn: text('nu_peso_cn').notNull(),
    nuPesoCh: text('nu_peso_ch').notNull(),
    nuPesoM: text('nu_peso_m').notNull(),
    nuPesoL: text('nu_peso_l').notNull(),
    nuPesoR: text('nu_peso_r').notNull(),
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

export const ofertaNotas = pgTable(
  'oferta_notas',
  {
    id: serial().primaryKey().notNull(),
    coOferta: integer('co_oferta').notNull(),
    nuModConcorrencia: text('nu_mod_concorrencia').notNull(),
    tpModConcorrencia: text('tp_mod_concorrencia').notNull(),
    coModConcorrencia: text('co_mod_concorrencia').notNull(),
    nuNotaMin: doublePrecision('nu_nota_min').notNull(),
    nuNotaMax: doublePrecision('nu_nota_max').notNull(),
  },
  (table) => {
    return {
      idxOfertaNotasCoOferta: index('idx_oferta_notas__co_oferta').using(
        'btree',
        table.coOferta.asc().nullsLast().op('int4_ops'),
      ),
      fkOfertaNotasCoOferta: foreignKey({
        columns: [table.coOferta],
        foreignColumns: [ofertas.coOferta],
        name: 'fk_oferta_notas__co_oferta',
      }).onDelete('cascade'),
    };
  },
);

export const nuModConcorrencia = pgMaterializedView('nu_mod_concorrencia').as((qb) => qb.selectDistinctOn([ofertaNotas.nuModConcorrencia], { nu_mod_concorrencia: ofertaNotas.nuModConcorrencia }).from(ofertaNotas));

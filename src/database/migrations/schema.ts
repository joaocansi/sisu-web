/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  pgTable,
  integer,
  text,
  index,
  foreignKey,
  serial,
  doublePrecision,
} from 'drizzle-orm/pg-core';

export const instituicaoLocalizacoesUf = pgTable(
  'instituicao_localizacoes_uf',
  {
    coIesUfLocalizacao: integer('co_ies_uf_localizacao').primaryKey().notNull(),
    sgUf: text('sg_uf').notNull(),
  },
);

export const instituicaoLocalizacoes = pgTable(
  'instituicao_localizacoes',
  {
    coIesLocalizacao: integer('co_ies_localizacao').primaryKey().notNull(),
    coIesUfLocalizacao: integer('co_ies_uf_localizacao').notNull(),
    noMunicipio: text('no_municipio').notNull(),
  },
  (table) => {
    return {
      idxInstituicaoLocalizacoesCoIesUfLocalizacao: index(
        'idx_instituicao_localizacoes__co_ies_uf_localizacao',
      ).using(
        'btree',
        table.coIesUfLocalizacao.asc().nullsLast().op('int4_ops'),
      ),
      fkInstituicaoLocalizacoesCoIesUfLocalizacao: foreignKey({
        columns: [table.coIesUfLocalizacao],
        foreignColumns: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
        name: 'fk_instituicao_localizacoes__co_ies_uf_localizacao',
      }).onDelete('cascade'),
    };
  },
);

export const instituicoes = pgTable(
  'instituicoes',
  {
    coIes: integer('co_ies').primaryKey().notNull(),
    noIes: text('no_ies').notNull(),
    sgIes: text('sg_ies').notNull(),
    coIesUfLocalizacao: integer('co_ies_uf_localizacao').notNull(),
    coIesLocalizacao: integer('co_ies_localizacao').notNull(),
  },
  (table) => {
    return {
      idxInstituicoesCoIesLocalizacao: index(
        'idx_instituicoes__co_ies_localizacao',
      ).using('btree', table.coIesLocalizacao.asc().nullsLast().op('int4_ops')),
      idxInstituicoesCoIesUfLocalizacao: index(
        'idx_instituicoes__co_ies_uf_localizacao',
      ).using(
        'btree',
        table.coIesUfLocalizacao.asc().nullsLast().op('int4_ops'),
      ),
      fkInstituicoesCoIesLocalizacao: foreignKey({
        columns: [table.coIesLocalizacao],
        foreignColumns: [instituicaoLocalizacoes.coIesLocalizacao],
        name: 'fk_instituicoes__co_ies_localizacao',
      }).onDelete('cascade'),
      fkInstituicoesCoIesUfLocalizacao: foreignKey({
        columns: [table.coIesUfLocalizacao],
        foreignColumns: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
        name: 'fk_instituicoes__co_ies_uf_localizacao',
      }).onDelete('cascade'),
    };
  },
);

export const instituicaoCampus = pgTable(
  'instituicao_campus',
  {
    coCampus: integer('co_campus').primaryKey().notNull(),
    coIesLocalizacao: integer('co_ies_localizacao').notNull(),
    coIesUfLocalizacao: integer('co_ies_uf_localizacao').notNull(),
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
      idxInstituicaoCampusCoIesLocalizacao: index(
        'idx_instituicao_campus__co_ies_localizacao',
      ).using('btree', table.coIesLocalizacao.asc().nullsLast().op('int4_ops')),
      idxInstituicaoCampusCoIesUfLocalizacao: index(
        'idx_instituicao_campus__co_ies_uf_localizacao',
      ).using(
        'btree',
        table.coIesUfLocalizacao.asc().nullsLast().op('int4_ops'),
      ),
      fkInstituicaoCampusCoIes: foreignKey({
        columns: [table.coIes],
        foreignColumns: [instituicoes.coIes],
        name: 'fk_instituicao_campus__co_ies',
      }).onDelete('cascade'),
      fkInstituicaoCampusCoIesLocalizacao: foreignKey({
        columns: [table.coIesLocalizacao],
        foreignColumns: [instituicaoLocalizacoes.coIesLocalizacao],
        name: 'fk_instituicao_campus__co_ies_localizacao',
      }).onDelete('cascade'),
      fkInstituicaoCampusCoIesUfLocalizacao: foreignKey({
        columns: [table.coIesUfLocalizacao],
        foreignColumns: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
        name: 'fk_instituicao_campus__co_ies_uf_localizacao',
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
    coCurso: integer('co_curso').notNull(),
    coIesUfLocalizacao: integer('co_ies_uf_localizacao').notNull(),
    coIesLocalizacao: integer('co_ies_localizacao').notNull(),
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
      idxOfertasCoCurso: index('idx_ofertas__co_curso').using(
        'btree',
        table.coCurso.asc().nullsLast().op('int4_ops'),
      ),
      idxOfertasCoIes: index('idx_ofertas__co_ies').using(
        'btree',
        table.coIes.asc().nullsLast().op('int4_ops'),
      ),
      idxOfertasCoIesLocalizacao: index(
        'idx_ofertas__co_ies_localizacao',
      ).using('btree', table.coIesLocalizacao.asc().nullsLast().op('int4_ops')),
      idxOfertasCoIesUfLocalizacao: index(
        'idx_ofertas__co_ies_uf_localizacao',
      ).using(
        'btree',
        table.coIesUfLocalizacao.asc().nullsLast().op('int4_ops'),
      ),
      fkOfertasCoCampus: foreignKey({
        columns: [table.coCampus],
        foreignColumns: [instituicaoCampus.coCampus],
        name: 'fk_ofertas__co_campus',
      }).onDelete('cascade'),
      fkOfertasCoCurso: foreignKey({
        columns: [table.coCurso],
        foreignColumns: [cursos.coCurso],
        name: 'fk_ofertas__co_curso',
      }).onDelete('cascade'),
      fkOfertasCoIes: foreignKey({
        columns: [table.coIes],
        foreignColumns: [instituicoes.coIes],
        name: 'fk_ofertas__co_ies',
      }).onDelete('cascade'),
      fkOfertasCoIesLocalizacao: foreignKey({
        columns: [table.coIesLocalizacao],
        foreignColumns: [instituicaoLocalizacoes.coIesLocalizacao],
        name: 'fk_ofertas__co_ies_localizacao',
      }).onDelete('cascade'),
      fkOfertasCoIesUfLocalizacao: foreignKey({
        columns: [table.coIesUfLocalizacao],
        foreignColumns: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
        name: 'fk_ofertas__co_ies_uf_localizacao',
      }).onDelete('cascade'),
    };
  },
);

export const cursos = pgTable('cursos', {
  coCurso: integer('co_curso').primaryKey().notNull(),
  noCurso: text('no_curso').notNull(),
});

export const ofertaNotas = pgTable(
  'oferta_notas',
  {
    id: serial().primaryKey().notNull(),
    coOferta: integer('co_oferta').notNull(),
    coOfertaModConcorrencia: integer('co_oferta_mod_concorrencia').notNull(),
    nuNotaMin: doublePrecision('nu_nota_min').notNull(),
    nuNotaMax: doublePrecision('nu_nota_max').notNull(),
  },
  (table) => {
    return {
      idxOfertaNotasCoOferta: index('idx_oferta_notas__co_oferta').using(
        'btree',
        table.coOferta.asc().nullsLast().op('int4_ops'),
      ),
      idxOfertaNotasCoOfertaModConcorrencia: index(
        'idx_oferta_notas__co_oferta_mod_concorrencia',
      ).using(
        'btree',
        table.coOfertaModConcorrencia.asc().nullsLast().op('int4_ops'),
      ),
      fkOfertaNotasCoOferta: foreignKey({
        columns: [table.coOferta],
        foreignColumns: [ofertas.coOferta],
        name: 'fk_oferta_notas__co_oferta',
      }).onDelete('cascade'),
      fkOfertaNotasCoOfertaModConcorrencia: foreignKey({
        columns: [table.coOfertaModConcorrencia],
        foreignColumns: [ofertaModConcorrencia.coOfertaModConcorrencia],
        name: 'fk_oferta_notas__co_oferta_mod_concorrencia',
      }).onDelete('cascade'),
    };
  },
);

export const ofertaModConcorrencia = pgTable('oferta_mod_concorrencia', {
  coOfertaModConcorrencia: integer('co_oferta_mod_concorrencia')
    .primaryKey()
    .notNull(),
  coModConcorrencia: integer('co_mod_concorrencia').notNull(),
  tpModConcorrencia: text('tp_mod_concorrencia').notNull(),
  noModConcorrencia: text('no_mod_concorrencia').notNull(),
});

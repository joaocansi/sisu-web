import { relations } from 'drizzle-orm/relations';
import {
  instituicaoLocalizacoesUf,
  instituicaoLocalizacoes,
  instituicoes,
  instituicaoCampus,
  ofertas,
  cursos,
  ofertaNotas,
  ofertaModConcorrencia,
} from './schema';

export const instituicaoLocalizacoesRelations = relations(
  instituicaoLocalizacoes,
  ({ one, many }) => ({
    instituicaoLocalizacoesUf: one(instituicaoLocalizacoesUf, {
      fields: [instituicaoLocalizacoes.coIesUfLocalizacao],
      references: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
    }),
    instituicoes: many(instituicoes),
    instituicaoCampuses: many(instituicaoCampus),
    ofertas: many(ofertas),
  }),
);

export const instituicaoLocalizacoesUfRelations = relations(
  instituicaoLocalizacoesUf,
  ({ many }) => ({
    instituicaoLocalizacoes: many(instituicaoLocalizacoes),
    instituicoes: many(instituicoes),
    instituicaoCampuses: many(instituicaoCampus),
    ofertas: many(ofertas),
  }),
);

export const instituicoesRelations = relations(
  instituicoes,
  ({ one, many }) => ({
    instituicaoLocalizacoe: one(instituicaoLocalizacoes, {
      fields: [instituicoes.coIesLocalizacao],
      references: [instituicaoLocalizacoes.coIesLocalizacao],
    }),
    instituicaoLocalizacoesUf: one(instituicaoLocalizacoesUf, {
      fields: [instituicoes.coIesUfLocalizacao],
      references: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
    }),
    instituicaoCampuses: many(instituicaoCampus),
    ofertas: many(ofertas),
  }),
);

export const instituicaoCampusRelations = relations(
  instituicaoCampus,
  ({ one, many }) => ({
    instituicoe: one(instituicoes, {
      fields: [instituicaoCampus.coIes],
      references: [instituicoes.coIes],
    }),
    instituicaoLocalizacoe: one(instituicaoLocalizacoes, {
      fields: [instituicaoCampus.coIesLocalizacao],
      references: [instituicaoLocalizacoes.coIesLocalizacao],
    }),
    instituicaoLocalizacoesUf: one(instituicaoLocalizacoesUf, {
      fields: [instituicaoCampus.coIesUfLocalizacao],
      references: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
    }),
    ofertas: many(ofertas),
  }),
);

export const ofertasRelations = relations(ofertas, ({ one, many }) => ({
  instituicaoCampus: one(instituicaoCampus, {
    fields: [ofertas.coCampus],
    references: [instituicaoCampus.coCampus],
  }),
  curso: one(cursos, {
    fields: [ofertas.coCurso],
    references: [cursos.coCurso],
  }),
  instituicoe: one(instituicoes, {
    fields: [ofertas.coIes],
    references: [instituicoes.coIes],
  }),
  instituicaoLocalizacoe: one(instituicaoLocalizacoes, {
    fields: [ofertas.coIesLocalizacao],
    references: [instituicaoLocalizacoes.coIesLocalizacao],
  }),
  instituicaoLocalizacoesUf: one(instituicaoLocalizacoesUf, {
    fields: [ofertas.coIesUfLocalizacao],
    references: [instituicaoLocalizacoesUf.coIesUfLocalizacao],
  }),
  ofertaNotas: many(ofertaNotas),
}));

export const cursosRelations = relations(cursos, ({ many }) => ({
  ofertas: many(ofertas),
}));

export const ofertaNotasRelations = relations(ofertaNotas, ({ one }) => ({
  oferta: one(ofertas, {
    fields: [ofertaNotas.coOferta],
    references: [ofertas.coOferta],
  }),
  ofertaModConcorrencia: one(ofertaModConcorrencia, {
    fields: [ofertaNotas.coOfertaModConcorrencia],
    references: [ofertaModConcorrencia.coOfertaModConcorrencia],
  }),
}));

export const ofertaModConcorrenciaRelations = relations(
  ofertaModConcorrencia,
  ({ many }) => ({
    ofertaNotas: many(ofertaNotas),
  }),
);

import { relations } from 'drizzle-orm/relations';
import {
  instituicoes,
  instituicaoCampus,
  ofertas,
  ofertaNotas,
} from './schema';

export const instituicaoCampusRelations = relations(
  instituicaoCampus,
  ({ one, many }) => ({
    instituicoe: one(instituicoes, {
      fields: [instituicaoCampus.coIes],
      references: [instituicoes.coIes],
    }),
    ofertas: many(ofertas),
  }),
);

export const instituicoesRelations = relations(instituicoes, ({ many }) => ({
  instituicaoCampuses: many(instituicaoCampus),
  ofertas: many(ofertas),
}));

export const ofertasRelations = relations(ofertas, ({ one, many }) => ({
  instituicaoCampus: one(instituicaoCampus, {
    fields: [ofertas.coCampus],
    references: [instituicaoCampus.coCampus],
  }),
  instituicoe: one(instituicoes, {
    fields: [ofertas.coIes],
    references: [instituicoes.coIes],
  }),
  ofertaNotas: many(ofertaNotas),
}));

export const ofertaNotasRelations = relations(ofertaNotas, ({ one }) => ({
  oferta: one(ofertas, {
    fields: [ofertaNotas.coOferta],
    references: [ofertas.coOferta],
  }),
}));

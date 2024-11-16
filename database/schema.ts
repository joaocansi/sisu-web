import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const institucoes = pgTable('instituicoes', {
    co_ies: integer('co_ies').primaryKey(),
    no_ies: text('no_ies').notNull(),
    sg_ies: text('sg_ies').notNull(),
    sg_uf: text('sg_uf').notNull(),
    no_municipio: text('no_municipio').notNull(),
})
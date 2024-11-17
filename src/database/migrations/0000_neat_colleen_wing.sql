-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "instituicoes" (
	"co_ies" integer PRIMARY KEY NOT NULL,
	"no_ies" text NOT NULL,
	"sg_ies" text NOT NULL,
	"sg_uf" text NOT NULL,
	"no_municipio" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instituicao_campus" (
	"co_campus" integer PRIMARY KEY NOT NULL,
	"no_campus" text NOT NULL,
	"sg_uf_campus" text NOT NULL,
	"no_municipio_campus" text NOT NULL,
	"co_ies" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ofertas" (
	"co_oferta" integer PRIMARY KEY NOT NULL,
	"co_campus" integer NOT NULL,
	"co_ies" integer NOT NULL,
	"no_curso" text NOT NULL,
	"qt_vagas_sem1" integer NOT NULL,
	"qt_vagas_sem2" integer NOT NULL,
	"no_grau" text NOT NULL,
	"st_turno_m" text NOT NULL,
	"st_turno_v" text NOT NULL,
	"st_turno_n" text NOT NULL,
	"nu_peso_cn" text NOT NULL,
	"nu_peso_ch" text NOT NULL,
	"nu_peso_m" text NOT NULL,
	"nu_peso_l" text NOT NULL,
	"nu_peso_r" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oferta_notas" (
	"id" serial PRIMARY KEY NOT NULL,
	"co_oferta" integer NOT NULL,
	"nu_mod_concorrencia" text NOT NULL,
	"tp_mod_concorrencia" text NOT NULL,
	"co_mod_concorrencia" text NOT NULL,
	"nu_nota_min" double precision NOT NULL,
	"nu_nota_max" double precision NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instituicao_campus" ADD CONSTRAINT "fk_instituicao_campus__co_ies" FOREIGN KEY ("co_ies") REFERENCES "public"."instituicoes"("co_ies") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ofertas" ADD CONSTRAINT "fk_ofertas__co_campus" FOREIGN KEY ("co_campus") REFERENCES "public"."instituicao_campus"("co_campus") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ofertas" ADD CONSTRAINT "fk_ofertas__co_ies" FOREIGN KEY ("co_ies") REFERENCES "public"."instituicoes"("co_ies") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oferta_notas" ADD CONSTRAINT "fk_oferta_notas__co_oferta" FOREIGN KEY ("co_oferta") REFERENCES "public"."ofertas"("co_oferta") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_instituicao_campus__co_ies" ON "instituicao_campus" USING btree ("co_ies" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ofertas__co_campus" ON "ofertas" USING btree ("co_campus" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ofertas__co_ies" ON "ofertas" USING btree ("co_ies" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_oferta_notas__co_oferta" ON "oferta_notas" USING btree ("co_oferta" int4_ops);
*/
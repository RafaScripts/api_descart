-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "dbteste";

-- CreateTable
CREATE TABLE "dbteste"."User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password_hash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "dbteste"."ws-empresas" (
    "uuid" TEXT NOT NULL,
    "cnpj_raiz" BIGINT,
    "razao_social" TEXT,
    "capital_social" TEXT,
    "responsavel_federativo" TEXT,
    "atualizado_em" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "socios" TEXT,
    "simples" TEXT,
    "atividade_principal" JSONB,
    "atividades_secundarias" TEXT,
    "bairro" TEXT,
    "cep" BIGINT,
    "cnpj" BIGINT NOT NULL,
    "cnpj_digito_verificador" TEXT,
    "cnpj_ordem" BIGINT,
    "complemento" TEXT,
    "data_inicio_atividade" TEXT,
    "data_situacao_cadastral" TEXT,
    "data_situacao_especial" TEXT,
    "ddd1" TEXT,
    "ddd2" TEXT,
    "ddd_fax" TEXT,
    "email" TEXT,
    "fax" TEXT,
    "inscricoes_estaduais" TEXT,
    "logradouro" TEXT,
    "nome_cidade_exterior" TEXT,
    "nome_fantasia" TEXT,
    "numero" TEXT,
    "situacao_cadastral" TEXT,
    "situacao_especial" TEXT,
    "telefone1" TEXT,
    "telefone2" TEXT,
    "tipo" TEXT,
    "tipo_logradouro" TEXT,
    "cidade" JSONB,
    "estado" JSONB,
    "pais" JSONB,
    "porte" JSONB,
    "natureza_juridica" JSONB,
    "qualificacao_do_responsavel" TEXT,
    "motivo_situacao_cadastral" TEXT,

    CONSTRAINT "ws-empresas_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "dbteste"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ws-empresas_cnpj_key" ON "dbteste"."ws-empresas"("cnpj");

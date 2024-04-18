import mongoose from 'mongoose';

interface User {
  uuid: string;
  email: string;
  name?: string;
  password_hash?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WSEmpresa {
  uuid: string;
  cnpj_raiz?: number;
  razao_social?: string;
  capital_social?: string;
  responsavel_federativo?: string;
  atualizado_em?: Date;
  created_at?: Date;
  updated_at?: Date;
  socios?: string;
  simples?: string;
  atividade_principal?: any; // Can be any JSON object
  atividades_secundarias?: string;
  bairro?: string;
  cep?: number;
  cnpj: number; // Unique constraint enforced on MongoDB side
  cnpj_digito_verificador?: string;
  cnpj_ordem?: number;
  complemento?: string;
  data_inicio_atividade?: string;
  data_situacao_cadastral?: string;
  data_situacao_especial?: string;
  ddd1?: string;
  ddd2?: string;
  ddd_fax?: string;
  email?: string;
  fax?: string;
  inscricoes_estaduais?: string;
  logradouro?: string;
  nome_cidade_exterior?: string;
  nome_fantasia?: string;
  numero?: string;
  situacao_cadastral?: string;
  situacao_especial?: string;
  telefone1?: string;
  telefone2?: string;
  tipo?: string;
  tipo_logradouro?: string;
  cidade?: any; // Can be any JSON object
  estado?: any; // Can be any JSON object
  pais?: any; // Can be any JSON object
  porte?: any; // Can be any JSON object
  natureza_juridica?: any; // Can be any JSON object
  qualificacao_do_responsavel?: string;
  motivo_situacao_cadastral?: string;
}

interface Client {
  uuid: string;
  name?: string;
  email: string;
  phone?: string;
  wsempresa?: string; // Reference to a WSEmpresa document's _id]
  fluxocaixa?: string;
  medioprazo?: string;
  longoprazo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<User>({
  uuid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password_hash: { type: String },
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now},
});

const WSEmpresaSchema = new mongoose.Schema<WSEmpresa>({
  uuid: { type: String, required: true },
  cnpj_raiz: { type: Number },
  razao_social: { type: String },
  capital_social: { type: String },
  responsavel_federativo: { type: String },
  atualizado_em: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
  socios: { type: String },
  simples: { type: String },
  atividade_principal: { type: mongoose.Schema.Types.Mixed },
  atividades_secundarias: { type: String },
  bairro: { type: String },
  cep: { type: Number },
  cnpj: { type: Number, unique: true },
  cnpj_digito_verificador: { type: String },
  cnpj_ordem: { type: Number },
  complemento: { type: String },
  data_inicio_atividade: { type: String },
  data_situacao_cadastral: { type: String },
  data_situacao_especial: { type: String },
  ddd1: { type: String },
  ddd2: { type: String },
  ddd_fax: { type: String },
  email: { type: String },
  fax: { type: String },
  inscricoes_estaduais: { type: String },
  logradouro: { type: String },
  nome_cidade_exterior: { type: String },
  nome_fantasia: { type: String },
  numero: { type: String },
  situacao_cadastral: { type: String },
  situacao_especial: { type: String },
  telefone1: { type: String },
  telefone2: { type: String },
  tipo: { type: String },
  tipo_logradouro: { type: String },
  cidade: { type: mongoose.Schema.Types.Mixed },
  estado: { type: mongoose.Schema.Types.Mixed },
  pais: { type: mongoose.Schema.Types.Mixed },
  porte: { type: mongoose.Schema.Types.Mixed },
  natureza_juridica: { type: mongoose.Schema.Types.Mixed },
  qualificacao_do_responsavel: { type: String },
  motivo_situacao_cadastral: { type: String },
});

const ClientSchema = new mongoose.Schema<Client>({
  uuid: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  wsempresa: { type: String },
  fluxocaixa: { type: String },
  medioprazo: { type: String },
  longoprazo: { type: String },
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

export const model_user = mongoose.model<User>(`User`, UserSchema);
export const model_wsempresa = mongoose.model<WSEmpresa>(`WSEmpresa`, WSEmpresaSchema);
export const model_client = mongoose.model<Client>(`Client`, ClientSchema);

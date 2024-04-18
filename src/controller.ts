import { Request, Response } from 'express';
import { model_wsempresa, model_user, model_client } from './models';
import jwt from 'jsonwebtoken';

//@ts-ignore
import consultarCNPJ from 'consultar-cnpj';


interface body {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  fluxocaixa: string;
  medioprazo: string;
  logoprazo: string;
}


async function getCnpj(cnpj: string) {
  return await consultarCNPJ(cnpj);
}

interface PrismaData {
  cnpj_raiz: string;
  razao_social?: string;
  capital_social?: string;
  responsavel_federativo?: string;
  atualizado_em?: string;
  created_at?: string;
  updated_at?: string;
  socios?: string;
  simples?: string;
  atividade_principal?: any;
  atividades_secundarias?: string;
  bairro?: string;
  cep?: number;
  cnpj: number;
  cnpj_digito_verificador?: string;
  cnpj_ordem?: number;
  complemento?: string;
  data_inicio_atividade?: string;
  data_situacao_cadastral?: string;
  data_situacao_especial?: string;
  ddd1?: string;
  ddd2?: string | null;
  ddd_fax?: string | null;
  email?: string;
  fax?: string | null;
  inscricoes_estaduais?: string;
  logradouro?: string;
  nome_cidade_exterior?: string | null;
  nome_fantasia?: string | null;
  numero?: string;
  situacao_cadastral?: string;
  situacao_especial?: string | null;
  telefone1?: string;
  telefone2?: string | null;
  tipo?: string;
  tipo_logradouro?: string;
  cidade?: any;
  estado?: any;
  pais?: any;
  porte?: any;
  natureza_juridica?: any;
  qualificacao_do_responsavel?: any;
  motivo_situacao_cadastral?: string | null;
}

interface JSONData {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  responsavel_federativo: string;
  atualizado_em: string;
  porte: { id: string; descricao: string };
  natureza_juridica: { id: string; descricao: string };
  qualificacao_do_responsavel: { id: number; descricao: string };
  socios: any[];
  simples: {
    simples: string;
    data_opcao_simples: string;
    data_exclusao_simples: string | null;
    mei: string;
    data_opcao_mei: string;
    data_exclusao_mei: string | null;
    atualizado_em: string;
  };
  estabelecimento: {
    cnpj: string;
    atividades_secundarias: {
      id: string;
      secao: string;
      divisao: string;
      grupo: string;
      classe: string;
      subclasse: string;
      descricao: string;
    }[];
    cnpj_raiz: string;
    cnpj_ordem: string;
    cnpj_digito_verificador: string;
    tipo: string;
    nome_fantasia: string | null;
    situacao_cadastral: string;
    data_situacao_cadastral: string;
    data_inicio_atividade: string;
    nome_cidade_exterior: string | null;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    ddd1: string;
    telefone1: string;
    ddd2: string | null;
    telefone2: string | null;
    ddd_fax: string | null;
    fax: string | null;
    email: string;
    situacao_especial: string | null;
    data_situacao_especial: string | null;
    atualizado_em: string;
    atividade_principal: {
      id: string;
      secao: string;
      divisao: string;
      grupo: string;
      classe: string;
      subclasse: string;
      descricao: string;
    };
    pais: {
      id: string;
      iso2: string;
      iso3: string;
      nome: string;
      comex_id: string;
    };
    estado: {
      id: number;
      nome: string;
      sigla: string;
      ibge_id: number;
    };
    cidade: {
      id: number;
      nome: string;
      ibge_id: number;
      siafi_id: string;
    };
    motivo_situacao_cadastral: string | null;
    inscricoes_estaduais: {
      inscricao_estadual: string;
      ativo: boolean;
      atualizado_em: string;
      estado: {
        id: number;
        nome: string;
        sigla: string;
        ibge_id: number;
      };
    }[];
  };
}

//@ts-ignore
function formatToPrisma(jsonData: JSONData): PrismaData {
  //@ts-ignore
  return {
    cnpj_raiz: jsonData.cnpj_raiz,
    razao_social: jsonData.razao_social,
    capital_social: jsonData.capital_social,
    responsavel_federativo: jsonData.responsavel_federativo,
    atualizado_em: jsonData.atualizado_em,
    created_at: jsonData.estabelecimento.atualizado_em,
    updated_at: jsonData.estabelecimento.atualizado_em,
    socios: JSON.stringify(jsonData.socios),
    simples: JSON.stringify(jsonData.simples),
    atividade_principal: jsonData.estabelecimento.atividade_principal,
    atividades_secundarias: JSON.stringify(jsonData.estabelecimento.atividades_secundarias),
    bairro: jsonData.estabelecimento.bairro,
    cep: parseInt(jsonData.estabelecimento.cep),
    cnpj: parseInt(jsonData.estabelecimento.cnpj),
    cnpj_digito_verificador: jsonData.estabelecimento.cnpj_digito_verificador,
    cnpj_ordem: parseInt(jsonData.estabelecimento.cnpj_ordem),
    complemento: jsonData.estabelecimento.complemento,
    data_inicio_atividade: jsonData.estabelecimento.data_inicio_atividade,
    data_situacao_cadastral: jsonData.estabelecimento.data_situacao_cadastral,
    data_situacao_especial: jsonData.estabelecimento.data_situacao_especial,
    ddd1: jsonData.estabelecimento.ddd1,
    ddd2: jsonData.estabelecimento.ddd2,
    ddd_fax: jsonData.estabelecimento.ddd_fax,
    email: jsonData.estabelecimento.email,
    fax: jsonData.estabelecimento.fax,
    inscricoes_estaduais: JSON.stringify(jsonData.estabelecimento.inscricoes_estaduais),
    logradouro: jsonData.estabelecimento.logradouro,
    nome_cidade_exterior: jsonData.estabelecimento.nome_cidade_exterior,
    nome_fantasia: jsonData.estabelecimento.nome_fantasia,
    numero: jsonData.estabelecimento.numero,
    situacao_cadastral: jsonData.estabelecimento.situacao_cadastral,
    situacao_especial: jsonData.estabelecimento.situacao_especial,
    telefone1: jsonData.estabelecimento.telefone1,
    telefone2: jsonData.estabelecimento.telefone2,
    tipo: jsonData.estabelecimento.tipo,
    tipo_logradouro: jsonData.estabelecimento.tipo_logradouro,
    cidade: JSON.stringify(jsonData.estabelecimento.cidade),
    estado: JSON.stringify(jsonData.estabelecimento.estado),
    pais: JSON.stringify(jsonData.estabelecimento.pais),
    porte: JSON.stringify(jsonData.estabelecimento.porte),
    natureza_juridica: JSON.stringify(jsonData.estabelecimento.natureza_juridica),
    qualificacao_do_responsavel: JSON.stringify(jsonData.qualificacao_do_responsavel),
    motivo_situacao_cadastral: jsonData.estabelecimento.motivo_situacao_cadastral,
  };
}

function parsePrismaData(data: any): any {
  try {
    //@ts-ignore
    let rt = {
      ...data,
      cidade: typeof data.cidade === 'string' ? JSON.parse(data.cidade) : data.cidade,
      estado: typeof data.estado === 'string' ? JSON.parse(data.estado) : data.estado,
      qualificacao_do_responsavel: typeof data.qualificacao_do_responsavel === 'string' ? JSON.parse(data.qualificacao_do_responsavel) : data.qualificacao_do_responsavel,
      pais: typeof data.pais === 'string' ? JSON.parse(data.pais) : data.pais,
      atividades_secundarias: typeof data.atividades_secundarias === 'string' ? JSON.parse(data.atividades_secundarias) : data.atividades_secundarias,
      socios: typeof data.socios === 'string' ? JSON.parse(data.socios) : data.socios,
      simples: typeof data.simples === 'string' ? JSON.parse(data.simples) : data.simples,
      // ... outros campos ...
    };

    //@ts-ignore
    let inscricoes_estatuais = JSON.parse(data.inscricoes_estaduais);

    //map inscricoes_estaduais and return only camps: inscricao_estadual, ativo and atualizado_em
    //@ts-ignore
    inscricoes_estatuais = inscricoes_estatuais.map((inscricao: any) => {
      return {
        inscricao_estadual: inscricao.inscricao_estadual,
        ativo: inscricao.ativo,
        atualizado_em: inscricao.atualizado_em
      };
    });

    rt['inscricoes_estaduais'] = inscricoes_estatuais;

    //@ts-ignore
    return rt;

  } catch (error) {
    console.error("Erro ao analisar dados JSON:", error);
    // Lidar com o erro de forma adequada (retornar valor padrão, lançar exceção)
    return {} as JSONData;
  }
}




function generateUUID() {
  //return 'XXXXXX-XXXX-XXXX-XXXXXX'
  return 'XXXXXX-XXXX-XXXX-XXXXXX'.replace(/[X]/g, () => {
    return Math.floor(Math.random() * 16).toString(16);
  });
}


export async function createLead(req: Request, res: Response){
  const {name, email, phone, cnpj ,fluxocaixa, medioprazo, longoprazo}:body = req.body;


  try {

    let dataOfCnpj: JSONData = await getCnpj(cnpj);

    let dataOfCnpjPrisma: PrismaData = formatToPrisma(dataOfCnpj);

    dataOfCnpjPrisma['uuid'] = generateUUID();
   // return res.status(200).json(dataOfCnpjPrisma);

    const createInfo = await model_wsempresa.create(dataOfCnpjPrisma);

    //@ts-ignore
    const data = {uuid: generateUUID(), name, email, phone, cnpj, wsempresa: dataOfCnpjPrisma.uuid, fluxocaixa, medioprazo, longoprazo};

    const createLead = await model_client.create(data);

    return res.status(200).json({message: 'Lead created', createLead, createInfo});

  }catch (e) {

    return res.status(400).json({message: 'Error to create lead', e});

  }

}

export async function getContacts(req: Request, res: Response){
  try {
    const contacts = await model_client.find();

    return res.status(200).json(contacts);
  }catch (e) {
    return res.status(400).json({message: 'Error to get contacts'});
  }
}

export async function getInfoCnpj(req: Request, res: Response){
  const {uuid} = req.query;

  try {
    let dataOfCnpj = await model_wsempresa.findOne({uuid: uuid});

    dataOfCnpj = dataOfCnpj.toObject();

    dataOfCnpj = parsePrismaData(dataOfCnpj);

    //if any field is null in dataOfCnpj remove field
    Object.keys(dataOfCnpj).forEach(key => {
      if (dataOfCnpj[key] === null || dataOfCnpj[key] == "") {
        delete dataOfCnpj[key];
      }
    });

    delete dataOfCnpj['_id'];

    return res.status(200).json(dataOfCnpj);
  }catch (e) {
    return res.status(400).json({message: 'Error to get info cnpj'});
  }
}

export async function loginuser(req: Request, res: Response){
  const data = req.body;
  const {email} = data;
  console.log(data);

  try {
    const user =  jwt.sign({
        name: 'rafael',
        email: email,
        image: 'https://avatars.githubusercontent.com/u/3703289?v=4'}, 'baseSecret', {expiresIn: '1d'});


    /*const user = await model_user.findOne({email});

    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    if (user.password !== password) {
      return res.status(400).json({message: 'Password incorrect'});
    }*/

    return res.status(200).json(user);

  }catch (e) {
    return res.status(400).json(e);
  }
}
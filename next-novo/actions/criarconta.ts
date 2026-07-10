"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod"; // 👈 ADICIONADO: Importando a biblioteca de validação Zod

// 👈 ADICIONADO: Esquema de validação do Zod para o Cadastro (Garante nome, e-mail válido, senha forte e checa igualdade)
const cadastroSchema = z
  .object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres!"),
    email: z.string().email("Insira um formato de e-mail válido!"),
    senha: z.string().min(4, "A senha deve ter pelo menos 4 dígitos!"),
    confirmacao: z.string(),
  })
  .refine((dados) => dados.senha === dados.confirmacao, {
    message: "As senhas estão incompatíveis.",
    path: ["confirmacao"],
  });

export type FormState = {
  msg: string;
  sucesso: boolean;
  fields: {
    nome: string;
    email: string;
  };
};

//essa eh uma estrutura padrao pra lidar com formularios
//precisa ser | undefined pra qnd a pagina iniciar!
export async function criarConta(
  state: FormState | undefined, //ele rastreia o que aconteceu na última tentativa de envio, ex: senha errada
  formData: FormData, //carrega todos os inputs do formulário de forma segura
): Promise<FormState> /* a funcao fala com o banco de dados e retorna algo, que eh a promise: o novo estado */ {
  //pegando informacoes!
  const nome = formData.get("nome")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const senha = formData.get("senha")?.toString() || "";
  const confirmacao = formData.get("confirmacao")?.toString() || "";

  //cria para quando retornar (caso dê erro) as infos preenchidas
  const fields = { nome, email };

  // 👈 ADICIONADO: Substituindo o "verificar se tá tudo preenchido" manual pela validação oficial do Zod
  const validacao = cadastroSchema.safeParse({
    nome,
    email,
    senha,
    confirmacao,
  });

  if (!validacao.success) {
    // 👈 CORRIGIDO: Usando .issues ao invés de .errors para o TypeScript aceitar
    const erroMensagem = validacao.error.issues[0].message;
    return { msg: erroMensagem, sucesso: false, fields };
  }

  // 1. verificar se o email ja ta cadastrado
  const usuarioExistente = await prisma.user.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return {
      msg: "Email já está em uso! Adicione outro.",
      sucesso: false,
      fields, //sempre retorna o fields!
    };
  }

  //passou por todas as verificacoes chega aqui:
  const senhaCriptograda = await bcrypt.hash(senha, 10);

  await prisma.user.create({
    data: {
      email: email,
      name: nome,
      password: senhaCriptograda,
    },
  });

  return {
    msg: `Bem-vindo ${nome}, conta criada!`,
    sucesso: true,
    fields: { nome: "", email: "" }, //zerando o campo!
  };
}

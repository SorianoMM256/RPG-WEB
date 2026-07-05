"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export type FormState = {
  msg: string;
  fields: {
    nome: string;
    email: string;
  };
};

//precisa ser | undefined pra qnd a pagina iniciar!
export async function criarConta(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  //pegando informacoes!
  const nome = formData.get("nome")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const senha = formData.get("senha")?.toString() || "";
  const confirmacao = formData.get("confirmacao")?.toString() || "";

  //cria para quando retornar (caso dê erro) as infos preenchidas
  const fields = { nome, email };

  if (!email || !nome || !senha || !confirmacao) {
    //retorna fields e msg pro frontend
    return { msg: "Preencha todas as informações!", fields };
  }

  // 1. verificar se o email ja ta cadastrado
  const usuarioExistente = await prisma.user.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return {
      msg: "Email já está em uso! Adicione outro.",
      fields, //sempre retorna o fields!
    };
  }
  //verificar se ta tudo preenchido
  if (senha != confirmacao) {
    return {
      msg: "As senhas estão incompatíveis.",
      fields,
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
    fields: { nome: "", email: "" }, //zerando o campo!
  };
}

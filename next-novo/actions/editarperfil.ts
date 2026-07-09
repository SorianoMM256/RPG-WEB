"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

//como vamos editar o perfil, a msg do status da operacao
export type FormState = {
  msg: string;
  sucesso: boolean;
};

export async function editarPerfil(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  //pega infos
  //forçamos o type scrypt a entender que isso são strings (ou null)
  //as string significa: eu juro que o que está vindo desse input é um texto, pode confiar e tirar esse aviso de erro
  const nome = formData.get("nome") as string | null;
  const email = formData.get("email") as string | null;

  // 1. pega a informacao do usuario logado
  const cookie = await cookies();
  const nomeUs = cookie.get("session")?.value;

  // 2. verificar se esta autenticado
  if (!nomeUs) {
    return { msg: "Usuário não autenticado", sucesso: false };
  }

  // 3. verifica se está preenchido
  if (!nome && !email) {
    return {
      msg: "Preencha ao menos um campo para salvar!",
      sucesso: false,
    };
  }

  // 3.5 Cria um obj de dados dinamico
  const dadosUsuario: { nome?: string; email?: string } = {};
  //se algum deles foi fornecido no formulario...
  if (nome) dadosUsuario.nome = nome;
  if (email) dadosUsuario.email = email;

  try {
    await prisma.user.update({
      where: {
        id: nomeUs,
      },
      data: dadosUsuario,
    });

    return {
      msg: "Perfil atualizado com sucesso!",
      sucesso: true,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Erro!",
      sucesso: false,
    };
  }
}

"use server";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

export type FormState = {
  msg: string; //mensagem de status em relacao ao login
  sucesso: boolean; //vai controlar a msg sucesso
  email: string;
};

export async function login(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  //pega as informacoes
  const email = formData.get("email")?.toString() || "";
  const senha = formData.get("senha")?.toString() || "";

  // 1. se estiverem vazios!
  if (!email || !senha) {
    return {
      msg: "Preencha todas as informações",
      sucesso: false,
      email: email,
    };
  }

  //  2. confere

  const usuarioExistente = await prisma.user.findUnique({ where: { email } });

  // 3. existe mesmo?
  if (!usuarioExistente) {
    return { msg: "Email não encontrado!", sucesso: false, email: email };
  }

  //compara a senha!
  const confirmacaoSenha = await bcrypt.compare(
    senha,
    usuarioExistente.password,
  );

  if (!confirmacaoSenha) {
    return { msg: "Senha incorreta!", sucesso: false, email: email };
  }

  return { msg: "Sucesso! Você está logado.", sucesso: true, email: "" };
}

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function criarConta(formData: FormData) {
  "use server";

  //pegando informacoes!
  const nome = formData.get("nome")?.toString();
  const email = formData.get("email")?.toString();
  const senha = formData.get("senha")?.toString();
  const confirmacao = formData.get("confirmacao")?.toString();

  if (!email || !nome || !senha || !confirmacao) {
    return { msg: "Preencha todas as informações!" };
  }

  // 1. verificar se o email ja ta cadastrado
  const usuarioExistente = await prisma.user.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return {
      msg: "Email já está em uso! Adicione outro.",
    };
  }
  //verificar se ta tudo preenchido
  if (senha == confirmacao) {
    if (nome) {
      const senhaCriptograda = await bcrypt.hash(senha!, 10);

      await prisma.user.create({
        data: {
          email: email,
          name: nome,
          password: senhaCriptograda,
        },
      });

      return {
        msg: `Bem-vindo ${nome}, conta criada!`,
      };
    }
  } else {
    return {
      msg: "As senhas estão incompatíveis.",
    };
  }
}

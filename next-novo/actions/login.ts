"use server";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod"; // 👈 ADICIONADO: Importando a biblioteca de validação Zod

// 👈 ADICIONADO: Esquema de validação do Zod para o Login
const loginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido!"),
  senha: z.string().min(1, "A senha é obrigatória!"),
});

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
  // 👈 ADICIONADO: Agora o Zod faz uma validação muito mais rigorosa (formato do email e se está vazio)
  const validacao = loginSchema.safeParse({ email, senha });

  if (!validacao.success) {
    // 👈 CORRIGIDO: Usando .issues ao invés de .errors para o TypeScript aceitar
    const erroMensagem = validacao.error.issues[0].message;
    return {
      msg: erroMensagem,
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

  // sessao jwt
  // monta a "mochila" do JWT (Payload) com os dados que você quer guardar
  // para manter logado!
  const payload = {
    id: usuarioExistente.id,
    nome: usuarioExistente.name,
    email: usuarioExistente.email,
    foto: usuarioExistente.foto || null,
  };

  // 4. Pega a chave secreta e assina o token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Algoritmo de criptografia
    .setIssuedAt()
    .setExpirationTime("1d") // Token dura 7 dias
    .sign(secret);

  // 5. Salva o token no Cookie do navegador
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true, // Segurança: o JavaScript do navegador não consegue roubar esse cookie
    secure: process.env.NODE_ENV === "production", // Usa HTTPS em produção
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 7 dias em segundos
  });

  return { msg: "Sucesso! Você está logado.", sucesso: true, email: "" };
}

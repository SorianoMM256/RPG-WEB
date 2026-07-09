"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUsuarioLogado() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null; // Se não tiver token, não tem ninguém logado

  try {
    // Pega a mesma chave secreta que usamos no login
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Descriptografa a "mochila" (payload) do JWT
    const { payload } = await jwtVerify(token, secret);

    return {
      nome: payload.nome as string,
      email: payload.email as string,
      foto: payload.foto as string | null,
    };
  } catch (error) {
    console.error("Token inválido ou expirado:", error);
    return null;
  }
}

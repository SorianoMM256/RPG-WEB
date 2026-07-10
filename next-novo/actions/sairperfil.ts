"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deslogarUsuario() {
  const cookieStore = await cookies();

  // Troque "token" pelo nome do cookie que você usa para autenticar
  cookieStore.delete("token");

  // Redireciona para a tela de login
  redirect("/login");
}

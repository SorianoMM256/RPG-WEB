import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Destrói o cookie chamado "session"
  cookieStore.delete("session");

  return NextResponse.json(
    { message: "Deslogado com sucesso" },
    { status: 200 },
  );
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { decodeJwt } from "jose";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const payload = decodeJwt(token);
    const userId = (payload.id || payload.userId) as string;

    if (!userId) {
      return NextResponse.json({ error: "Token inválido" }, { status: 400 });
    }

    const usuario = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { npcs: true },
        },
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        nome: usuario.name,
        totalCards: usuario._count.npcs,
        foto: usuario.foto, // 👈 CORRIGIDO: Usando a propriedade real do banco
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}

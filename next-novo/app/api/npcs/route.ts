import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// ==========================================
// ROTA PARA CRIAR NPC (MANTIDA IGUAL A SUA)
// ==========================================
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const body = await request.json();

    if (!body.nome || !body.classe || !body.raca) {
      return NextResponse.json(
        { message: "Dados obrigatórios não informados." },
        { status: 400 },
      );
    }

    const npc = await prisma.npc.create({
      data: {
        name: body.nome,
        alignment: body.moral,
        race: body.raca,
        className: body.classe,

        strength: body.forca,
        dexterity: body.destreza,
        constitution: body.constituicao,
        intelligence: body.inteligencia,
        wisdom: body.sabedoria,
        charisma: body.carisma,

        skills: body.skills.join(","),
        equipment: body.equipamentos.join(","),

        userId: payload.id as string,
      },
    });

    return NextResponse.json(npc, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar NPC." },
      { status: 500 },
    );
  }
}

// ==========================================
// ROTA PARA LISTAR NPCs (ALTERADA E FILTRADA)
// ==========================================
export async function GET() {
  try {
    // 1. Pega o cookie da sessão do usuário que está tentando ver a lista
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    // Se não estiver logado, nem deixa consultar o banco
    if (!token) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 },
      );
    }

    // 2. Valida o JWT para descobrir com segurança quem é esse usuário
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userIdLogado = payload.id as string;

    // 3. A MÁGICA: Busca no banco apenas os NPCs que pertencem ao ID desse usuário
    const npcs = await prisma.npc.findMany({
      where: {
        userId: userIdLogado,
      },
    });

    return NextResponse.json(npcs, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar NPCs:", error);
    return NextResponse.json({ error: "Erro ao buscar NPCs" }, { status: 500 });
  }
}

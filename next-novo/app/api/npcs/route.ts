import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
  try {
    // Obtém o cookie da sessão
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;


    if (!token) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    // Valida o JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const body = await request.json();

    if (!body.nome || !body.classe || !body.raca) {
      return NextResponse.json(
        { message: "Dados obrigatórios não informados." },
        { status: 400 }
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

        // Agora vem do JWT
        userId: payload.id as string,
      },
    });

    return NextResponse.json(npc, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erro ao criar NPC." },
      { status: 500 }
    );
  }
}
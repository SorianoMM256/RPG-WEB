import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Exemplo:
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Quando o login estiver pronto:
    // const session = await getServerSession(authOptions);
    //
    // if (!session?.user?.id) {
    //   return NextResponse.json(
    //     { message: "Usuário não autenticado" },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();

    if (
      !body.nome ||
      !body.classe ||
      !body.raca
    ) {
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

        // Substituir quando o login estiver integrado
        userId: body.userId,
      },
    });

    return NextResponse.json(npc, {
      status: 201,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erro ao criar NPC.",
      },
      {
        status: 500,
      }
    );
  }
}
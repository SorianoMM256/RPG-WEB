import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// REPARE NO: { params }: { params: Promise<{ id: string }> }
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // RESOLVE A PROMISE DOS PARAMS PRIMEIRO
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    await prisma.npc.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "NPC deletado com sucesso!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro interno ao deletar NPC:", error);
    return NextResponse.json({ error: "Erro ao deletar NPC" }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // RESOLVENDO A PROMISE DOS PARAMS IGUAL FIZEMOS NOS OUTROS
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const npc = await prisma.npc.findUnique({
      where: { id: id },
    });

    if (!npc) {
      return NextResponse.json(
        { error: "NPC não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(npc, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar NPC:", error);
    return NextResponse.json(
      { error: "Erro ao buscar os dados do NPC." },
      { status: 500 },
    );
  }
}

// AJUSTANDO O PUT TAMBÉM DA MESMA FORMA
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();

    const npcAtualizado = await prisma.npc.update({
      where: { id: id },
      data: {
        name: body.nome,
        className: body.classe,
        race: body.raca,
        alignment: body.moral,
        equipment: body.equipamentos.join(","),
        strength: body.forca,
        dexterity: body.destreza,
        constitution: body.constituicao,
        intelligence: body.inteligencia,
        wisdom: body.sabedoria,
        charisma: body.carisma,
        skills: body.skills.join(","),
      },
    });

    return NextResponse.json(npcAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar NPC:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar NPC" },
      { status: 500 },
    );
  }
}

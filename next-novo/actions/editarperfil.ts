"use server";

import { prisma } from "@/lib/prisma";

/*A versão padrão do fs não aceita await (Promises); 
ela espera que você passe uma função de resposta (callback) como 3º ou 4º argumento. 
p usar com await, precisamos importar a versão moderna baseada em Promises.*/
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import { jwtVerify, SignJWT } from "jose";

//como vamos editar o perfil, a msg do status da operacao
export type FormState = {
  msg: string;
  sucesso: boolean;
};

export async function editarPerfil(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  //pega infos
  //forçamos o type scrypt a entender que isso são strings (ou null)
  //as string significa: eu juro que o que está vindo desse input é um texto, pode confiar e tirar esse aviso de erro
  const nome = formData.get("nome") as string | null;
  const email = formData.get("email") as string | null;

  const arqFoto = formData.get("foto") as File | null;

  // 1. pega a informacao do usuario logado
  const cookie = await cookies();
  const token = cookie.get("session")?.value;

  // 2. verificar se esta autenticado
  if (!token) {
    return { msg: "Usuário não autenticado", sucesso: false };
  }

  let userId: string;
  let nomeAtual: string;
  let emailAtual: string;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    userId = payload.id as string; // Pega o ID real pra usar no Prisma
    nomeAtual = payload.nome as string;
    emailAtual = payload.email as string;
  } catch (error) {
    return { msg: "Sessão inválida ou expirada", sucesso: false };
  }

  // 3. verifica se está preenchido (Agora verificando se está diferente do original!)
  const mudouNome = nome && nome !== nomeAtual;
  const mudouEmail = email && email !== emailAtual;
  const enviouNovaFoto = arqFoto && arqFoto.size > 0;

  if (!mudouNome && !mudouEmail && !enviouNovaFoto) {
    return {
      msg: "Nenhuma alteração foi feita no perfil.",
      sucesso: false,
    };
  }

  let urlFoto: string | undefined = undefined;

  //o >0 significa que: qnd nada eh selecionado, um file vazio vem como obj, e o tamanho em bytes eh 0
  if (enviouNovaFoto && arqFoto) {
    try {
      //recebe o arquivo como file e transforma pra buffer: dados binarios
      const bytes = await arqFoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //toda essa coisa feia existe por 1 motivo: NAO REPETIR o nome do arquivo e puxar errado!
      // nome do usuario + o horario de criacao + o tipo da imagme (jpg, png..)
      // OBS: Substituímos o token pelo ID real do usuário no nome do arquivo
      const nomeArq = `${userId}-${Date.now()}${path.extname(arqFoto.name)}`;

      //aqui mostra onde salvar!
      //o cwd significa current working directory, descobrindo onde o projeto está
      //path.join junta os pedacos, formatando com barras!
      const caminho = path.join(process.cwd(), "public", "uploads", nomeArq);

      await writeFile(caminho, buffer);
      urlFoto = `/uploads/${nomeArq}`;
    } catch (error) {
      console.error(error);
      return { msg: "Erro ao salvar foto de pefil!", sucesso: false };
    }
  }

  // 3.5 Cria um obj de dados dinamico
  const dadosUsuario: { name?: string; email?: string; foto?: string } = {};
  //se algum deles foi fornecido no formulario...
  if (mudouNome) dadosUsuario.name = nome; // Passamos "name" pois é como deve estar no Prisma
  if (mudouEmail) dadosUsuario.email = email;
  if (urlFoto) dadosUsuario.foto = urlFoto;

  // 5. Salva no banco de dados e ATUALIZA O COOKIE!
  try {
    const usuarioAtualizado = await prisma.user.update({
      where: {
        id: userId,
      },
      data: dadosUsuario,
    });

    // NOVA PARTE: Gerar um cookie novo com os dados atualizados
    const novoPayload = {
      id: usuarioAtualizado.id,
      nome: usuarioAtualizado.name,
      email: usuarioAtualizado.email,
      foto: usuarioAtualizado.foto,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const tokenAtualizado = await new SignJWT(novoPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("session", tokenAtualizado, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });
    // -----------------------------------------------------------------

    return {
      msg: "Perfil atualizado com sucesso!",
      sucesso: true,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Erro!",
      sucesso: false,
    };
  }
}

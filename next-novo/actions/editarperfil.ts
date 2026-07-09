"use server";

import { prisma } from "@/lib/prisma";

/*A versão padrão do fs não aceita await (Promises); 
ela espera que você passe uma função de resposta (callback) como 3º ou 4º argumento. 
p usar com await, precisamos importar a versão moderna baseada em Promises.*/
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";

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
  const nomeUs = cookie.get("session")?.value;

  // 2. verificar se esta autenticado
  if (!nomeUs) {
    return { msg: "Usuário não autenticado", sucesso: false };
  }

  // 3. verifica se está preenchido
  if (!nome && !email) {
    return {
      msg: "Preencha ao menos um campo para salvar!",
      sucesso: false,
    };
  }

  let urlFoto: string | undefined = undefined;

  //o >0 significa que: qnd nada eh selecionado, um file vazio vem como obj, e o tamanho em bytes eh 0
  if (arqFoto && arqFoto.size > 0) {
    try {
      //recebe o arquivo como file e transforma pra buffer: dados binarios
      const bytes = await arqFoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //toda essa coisa feia existe por 1 motivo: NAO REPETIR o nome do arquivo e puxar errado!
      // nome do usuario + o horario de criacao + o tipo da imagme (jpg, png..)
      const nomeArq = `${nomeUs}-${Date.now()}${path.extname(arqFoto.name)}`;

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
  const dadosUsuario: { nome?: string; email?: string; foto?: string } = {};
  //se algum deles foi fornecido no formulario...
  if (nome) dadosUsuario.nome = nome;
  if (email) dadosUsuario.email = email;
  if (urlFoto) dadosUsuario.foto = urlFoto;

  try {
    await prisma.user.update({
      where: {
        id: nomeUs,
      },
      data: dadosUsuario,
    });

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

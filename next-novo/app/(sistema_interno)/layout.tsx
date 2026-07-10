"use client";

import "./sistema.css";
import Link from "next/link";
// 1. Adicionamos o useEffect na importação do React
import { useEffect, useState } from "react";
import { MedievalSharp } from "next/font/google";
import { useRouter } from "next/navigation";
// 2. Importamos a Action que busca o usuário
import { getUsuarioLogado } from "@/actions/usuariologado";

const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  // 3. Criamos um estado para guardar a foto do usuário
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  // 4. Buscamos a foto assim que o layout carregar
  useEffect(() => {
    async function carregarFotoLayout() {
      const dados = await getUsuarioLogado();
      if (dados?.foto) {
        setFotoPerfil(dados.foto);
      }
    }
    carregarFotoLayout();

    // ADICIONADO: Escuta o evento de atualização para atualizar o avatar em tempo real!
    window.addEventListener("perfilAtualizado", carregarFotoLayout);

    // Limpa o ouvinte quando o componente desmontar (boa prática)
    return () => {
      window.removeEventListener("perfilAtualizado", carregarFotoLayout);
    };
  }, []);

  function abrirModal() {
    router.push("/editarperfil?upload=true");
  }

  return (
    <html lang="pt-br">
      <body>
        <header>
          <img src="/teste.png" id="logo" />

          <nav className="menu-nav">
            <Link href="/tutorial" className="tutorial">
              Tutorial
            </Link>
          </nav>
          <div className="container-avatar">
            {/* 5. Trocamos o src fixo pela variável fotoPerfil (com a imagem padrão de fallback) */}
            <button
              className="btnperfil"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              <img
                src={fotoPerfil || "/avatar.png"}
                className="avatar"
                id="avatar"
                alt="Foto de Perfil"
              />
            </button>

            {menuAberto && (
              <div className="menuzinho">
                <Link href="/verperfil" className="ver">
                  Ver Perfil
                </Link>
                <button onClick={abrirModal} className="editar">
                  Editar Perfil
                </button>
                <button className="logout">Exit</button>
              </div>
            )}
          </div>
        </header>

        <div className="conteudo">
          <aside>
            <nav className="side-bar">
              <Link href="/principal" className="Cards">
                Home
              </Link>
              <Link href="/feedback" className="Feedback">
                Seu Feedback
              </Link>
            </nav>
          </aside>

          <main className="main_interno">{children}</main>
        </div>
      </body>
    </html>
  );
}

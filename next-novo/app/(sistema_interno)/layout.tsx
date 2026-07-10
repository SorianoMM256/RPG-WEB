"use client";

import "./sistema.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MedievalSharp } from "next/font/google";
import { useRouter } from "next/navigation";
import { getUsuarioLogado } from "@/actions/usuariologado";
import { deslogarUsuario } from "@/actions/sairperfil"; // Ajuste o caminho conforme sua pasta

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
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  useEffect(() => {
    async function carregarFotoLayout() {
      const dados = await getUsuarioLogado();
      if (dados?.foto) {
        setFotoPerfil(dados.foto);
      }
    }
    carregarFotoLayout();

    // Escuta o evento de atualização para atualizar o avatar em tempo real
    window.addEventListener("perfilAtualizado", carregarFotoLayout);
    window.addEventListener("perfilAtualizado", carregarFotoLayout);

    return () => {
      window.removeEventListener("perfilAtualizado", carregarFotoLayout);
    };
  }, []);

  function abrirModal() {
    router.push("/editarperfil?upload=true");
  }

  async function handleLogout() {
    const confirmou = window.confirm("Tem certeza que deseja sair?");
    if (confirmou) {
      setMenuAberto(false);
      await deslogarUsuario();
    }
  }

  return (
    <html lang="pt-br">
      <body>
        <header>
          <img src="/teste.png" id="logo" alt="Logo" />

          <div className="container-avatar">
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
                <button onClick={handleLogout} className="logout">
                  Exit
                </button>
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

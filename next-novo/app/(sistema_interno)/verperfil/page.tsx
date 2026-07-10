"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../sistema.css";
import "./verperfil.css";

interface PerfilData {
  nome: string;
  totalCards: number;
  foto?: string | null; // 👈 Atualizado de 'imagem' para 'foto'
}

export default function VerPerfil() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const response = await fetch("/api/usuario/perfil");
        if (response.ok) {
          const data = await response.json();
          setPerfil(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  if (carregando) {
    return (
      <main>
        <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Carregando dados do perfil...
        </h2>
      </main>
    );
  }

  const fotoPadrao = `https://api.dicebear.com/7.x/initials/svg?seed=${perfil?.nome || "User"}`;

  return (
    <main>
      <div className="cabeca">
        <div className="imgpag">
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {/* 👈 Lendo 'perfil?.foto' agora sem erros de tipo */}
            <img
              src={perfil?.foto || fotoPadrao}
              width="90"
              height="90"
              alt="Foto de Perfil"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--cor-primaria, #fff)",
              }}
            />
          </button>
        </div>
        <div className="infopag">
          <h3 className="h3_1">Perfil</h3>
          <h1 className="h1_1">
            <span>{perfil?.nome || "Usuário"}</span>
          </h1>
          <h3 className="h3_2">
            <span>{perfil?.totalCards ?? 0} </span>Cards
          </h3>
        </div>
      </div>
    </main>
  );
}

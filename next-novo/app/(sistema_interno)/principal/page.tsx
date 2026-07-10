"use client";
import Link from "next/link";
import "../sistema.css";
import "./principal.css";
import { useState } from "react";

// 1. AJUSTE NA INTERFACE: Nomes alinhados com o Banco de Dados (Prisma)
interface Personagem {
  id: string;
  name: string;
  className: string;
  race: string;
  alignment: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  skills: string;
  equipment: string;
  imagem?: string;
}

export default function Pagina() {
  // ATENÇÃO: Essa lista ainda é de dados "falsos" (mock).
  // No futuro, vocês farão um useEffect aqui para dar um fetch() e puxar os reais do banco!
  const listaPersonagens: Personagem[] = [
    {
      id: "1",
      name: "Dwarf Barbarian",
      className: "Guerreiro",
      race: "Anão",
      alignment: "Caótico e Bom",
      strength: 18,
      dexterity: 12,
      constitution: 16,
      intelligence: 8,
      wisdom: 10,
      charisma: 6,
      skills: "Atletismo, Intimidação",
      equipment: "Machado Grande, Poção de Vida",
      imagem: "/01.jpg",
    },
    // ... adicionei os dados extras necessários na interface
  ];

  const [indiceAtual, setIndiceAtual] = useState(0);

  const [personagemSelecionado, setPersonagemSelecionado] =
    useState<Personagem | null>(null);

  const voltarCard = () => {
    if (listaPersonagens.length === 0) return;
    setIndiceAtual((prev) =>
      prev === 0 ? listaPersonagens.length - 1 : prev - 1,
    );
  };

  const avancarCard = () => {
    if (listaPersonagens.length === 0) return;
    setIndiceAtual((prev) =>
      prev === listaPersonagens.length - 1 ? 0 : prev + 1,
    );
  };

  const obterClassePosicao = (index: number) => {
    if (index === indiceAtual) return "card-centro";
    const total = listaPersonagens.length;
    if (index === (indiceAtual - 1 + total) % total) return "card-esquerda";
    if (index === (indiceAtual + 1) % total) return "card-direita";
    return "card-escondido";
  };

  // 2. FUNÇÃO QUE CHAMA A NOSSA ROTA DE DELETE NO BACKEND
  async function deletarPersonagem(id: string) {
    const confirmacao = confirm("Tem certeza que deseja excluir este NPC?");
    if (!confirmacao) return;

    try {
      const response = await fetch(`/api/npcs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("NPC deletado com sucesso!");
      setPersonagemSelecionado(null);
      // Aqui, futuramente, vocês vão recarregar a lista de NPCs chamando o backend de novo
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir personagem.");
    }
  }

  // 3. FUNÇÃO QUE VAI CHAMAR A ROTA DE PUT (Ainda precisa da tela de edição)
  function editarPersonagem(id: string) {
    alert(
      "Aqui futuramente abrirá a tela de edição para salvar no Banco de Dados!",
    );
    // Lógica para enviar para a tela de Update irá aqui.
  }

  return (
    <main className="ajuda">
      {listaPersonagens.length === 0 ? (
        <div className="vazio">
          <p className="AVISO">
            Olá, monte seu primeiro personagem no botão abaixo
          </p>
        </div>
      ) : (
        <div className="carrossel">
          {listaPersonagens.length > 1 && (
            <button className="setas" onClick={voltarCard}>
              <img src="/seta-esquerda.png" className="img-seta" alt="Voltar" />
            </button>
          )}

          <div className="cards">
            {listaPersonagens.map((personagem, index) => {
              const classePosicao = obterClassePosicao(index);
              const ehOCardDoCentro = index === indiceAtual;

              return (
                <div
                  key={personagem.id}
                  className={`card-rpg ${classePosicao}`}
                  onClick={() =>
                    ehOCardDoCentro && setPersonagemSelecionado(personagem)
                  }
                  style={{ cursor: ehOCardDoCentro ? "pointer" : "default" }}
                >
                  <h3>{personagem.name}</h3>
                  <img
                    src={personagem.imagem || "/avatar.png"}
                    alt={personagem.name}
                    className="card-avatar"
                  />
                  <div className="status">
                    <p>Classe: {personagem.className}</p>
                    <br />
                    <p>
                      STR: {personagem.strength} | DEX: {personagem.dexterity}
                    </p>
                    <p>
                      CON: {personagem.constitution} | CHA:{" "}
                      {personagem.charisma}
                    </p>
                    <p>
                      INT: {personagem.intelligence} | WIS: {personagem.wisdom}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {listaPersonagens.length > 1 && (
            <button className="setas" onClick={avancarCard}>
              <img src="/seta-direita.png" className="img-seta" alt="Avançar" />
            </button>
          )}
        </div>
      )}

      <div className="container">
        <Link
          href="/criarcard"
          className="add"
          data-back="Criar"
          data-front="+"
        ></Link>
      </div>

      {/* MODAL PÁGINA DE VISUALIZAÇÃO DO CARD */}
      {personagemSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => setPersonagemSelecionado(null)}
        >
          <div
            className="modal-pergaminho"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-fechar-modal"
              onClick={() => setPersonagemSelecionado(null)}
            >
              X
            </button>

            <h2>{personagemSelecionado.name}</h2>
            <img
              src={personagemSelecionado.imagem || "/avatar.png"}
              alt={personagemSelecionado.name}
              className="modal-avatar"
            />

            <div className="modal-status-grade">
              <p>
                <strong>Classe:</strong> {personagemSelecionado.className}
              </p>
              <p>
                <strong>Raça:</strong> {personagemSelecionado.race}
              </p>
              <p>
                <strong>Moral:</strong> {personagemSelecionado.alignment}
              </p>

              <hr />

              <div className="atributos-grid">
                <p>STR: {personagemSelecionado.strength}</p>
                <p>DEX: {personagemSelecionado.dexterity}</p>
                <p>CON: {personagemSelecionado.constitution}</p>
                <p>CHA: {personagemSelecionado.charisma}</p>
                <p>INT: {personagemSelecionado.intelligence}</p>
                <p>WIS: {personagemSelecionado.wisdom}</p>
              </div>

              <hr />

              {/* Informações adicionais do banco */}
              <div className="infos-extras">
                <p>
                  <strong>Skills:</strong>{" "}
                  {personagemSelecionado.skills || "Nenhuma"}
                </p>
                <p>
                  <strong>Equipamentos:</strong>{" "}
                  {personagemSelecionado.equipment || "Nenhum"}
                </p>
              </div>

              {/* Botões de Ação */}
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  className="btn-ex"
                  onClick={() => editarPersonagem(personagemSelecionado.id)}
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  Editar card
                </button>

                <button
                  className="btn-ex"
                  onClick={() => deletarPersonagem(personagemSelecionado.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Excluir card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

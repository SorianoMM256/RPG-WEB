'use client';
import Link from "next/link";
import "../sistema.css";
import "./principal.css"
import { useState } from 'react';

interface Personagem {
  id: number | string;
  nome: string;
  classe: string;
  str: number;
  dex: number;
  imagem: string;
}
export default function Pagina() {

    const listaPersonagens: Personagem[] = [
    { id: 1, nome: "Dwarf Barbarian", classe: "Guerreiro", str: 18, dex: 12, imagem: "/01.jpg" },
    { id: 2, nome: "Elf Ranger", classe: "Arqueiro", str: 12, dex: 18, imagem: "/02.jpg" },
    { id: 3, nome: "Human Mage", classe: "Mago", str: 10, dex: 14, imagem: "/03.jpg" },
    ];

    const [indiceAtual, setIndiceAtual] = useState(0);


    const voltarCard = () => {
        if (listaPersonagens.length === 0) return;
        setIndiceAtual((prev) => (prev === 0 ? listaPersonagens.length - 1 : prev - 1));
    };

    const avancarCard = () => {
        if (listaPersonagens.length === 0) return;
        setIndiceAtual((prev) => (prev === listaPersonagens.length - 1 ? 0 : prev + 1));
    };

    const obterClassePosicao = (index: number) => {
        if (index === indiceAtual) return "card-centro";
        
        const total = listaPersonagens.length;
        if (index === (indiceAtual - 1 + total) % total) return "card-esquerda";
        if (index === (indiceAtual + 1) % total) return "card-direita";
        
        return "card-escondido";
    };

    return(
        <main className = "ajuda">

        {listaPersonagens.length === 0 ? (
        <div className="vazio">
          <p className="AVISO">Monte seu primeiro personagem no botão abaixo</p>
        </div>
      ) : (
        <div className="carrossel">
          {}
          {listaPersonagens.length > 1 && (
            <button className="setas" onClick={voltarCard}>
              <img src="/seta-esquerda.png" className="img-seta" alt="Voltar" />
            </button>
          )}

          <div className="cards">
            {listaPersonagens.map((personagem, index) => {
              const classePosicao = obterClassePosicao(index);
              
              return (
                <div key={personagem.id} className={`card-rpg ${classePosicao}`}>
                  <h3>{personagem.nome}</h3>
                  <img src={personagem.imagem || "/avatar.png"} alt={personagem.nome} className="card-avatar" />
                  <div className="status">
                    <p>Classe: {personagem.classe}</p>
                    <p>STR: {personagem.str} | DEX: {personagem.dex}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {}
          {listaPersonagens.length > 1 && (
            <button className="setas" onClick={avancarCard}>
              <img src="/seta-direita.png" className="img-seta" alt="Avançar" />
            </button>
          )}
        </div>
      )}

        <div className="container">
        <Link href='/criar' className="add" data-back="Criar" data-front="+"></Link>
        </div>
         
        </main>
    );
}
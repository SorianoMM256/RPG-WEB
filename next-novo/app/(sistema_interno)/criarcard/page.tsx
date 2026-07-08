'use client';

import { useState, useEffect } from 'react';
import "../sistema.css";
//import "./criarcard.css"

interface Skill {
  nome: string;
  atributo: string;
  valor: number;
  selecionado: boolean;
}

export default function card() {
  const [aberto, setAberto] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function buscarSkills() {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkills(data);
      } catch (erro) {
        console.error('Erro ao buscar skills:', erro);
      }
    }
    buscarSkills();
  }, []);

  function alternarSelecionado(index: number) {
    setSkills(prev =>
      prev.map((skill, i) =>
        i === index ? { ...skill, selecionado: !skill.selecionado } : skill
      )
    );
  }

  function alterarValor(index: number, novoValor: string) {
    const numero = novoValor === '' ? 0 : parseInt(novoValor, 10);
    setSkills(prev =>
      prev.map((skill, i) =>
        i === index ? { ...skill, valor: isNaN(numero) ? skill.valor : numero } : skill
      )
    );
  }
    return(
        <main>

        <div className='criarcard'>
        <form>
        <h1> Crie seu NPC </h1>

        <input type='text' className="nomeNPC" placeholder="Nome"></input>

        <select name="classe" id="classe"> 
        </select>

        <select name="raca" id="raca">
        </select>

        <input type='text' className="moral" placeholder="Bússola Moral"></input>

        <select name="equipamentos" id="equipamentos" multiple>
        </select>


        <div className="skillsBox">
            <button
              type="button"
              className="skillsCabecalho"
              onClick={() => setAberto(!aberto)}
            >
              <span>SKILLS</span>
              <span className={`seta ${aberto ? 'aberta' : ''}`}>▼</span>
            </button>

            {aberto && (
              <div className="skillsLista">
                {skills.map((skill, index) => (
                  <div key={skill.nome} className="skillLinha">
                    <input
                      type="checkbox"
                      checked={skill.selecionado}
                      onChange={() => alternarSelecionado(index)}
                      className="skillCheckbox"
                    />
                    <input
                      type="number"
                      value={skill.valor}
                      onChange={(e) => alterarValor(index, e.target.value)}
                      className="skillValor"
                    />
                    <span className="skillNome">
                      {skill.nome} <span className="skillAtributo">({skill.atributo})</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input type='number' className="atributo" placeholder="Força"></input>
          <input type='number' className="atributo" placeholder="Destreza"></input>
          <input type='number' className="atributo" placeholder="Constituição"></input>
          <input type='number' className="atributo" placeholder="Inteligência"></input>
          <input type='number' className="atributo" placeholder="Sabedoria"></input>
          <input type='number' className="atributo" placeholder="Carisma"></input>

          <button className='btnSalvar'>Salvar</button>

        </form>
      </div>
    </main>
  );
}
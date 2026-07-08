'use client';

import { useState, useEffect } from 'react';
import "../sistema.css";
import "./criarcard.css";

interface Skill {
  nome: string;
  atributo: string;
  valor: number;
  selecionado: boolean;
}

export default function CreateCardPage() {
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
        i === index
          ? { ...skill, selecionado: !skill.selecionado }
          : skill
      )
    );
  }

  function alterarValor(index: number, novoValor: string) {
    const numero = novoValor === '' ? 0 : parseInt(novoValor, 10);

    setSkills(prev =>
      prev.map((skill, i) =>
        i === index
          ? {
              ...skill,
              valor: isNaN(numero) ? skill.valor : numero
            }
          : skill
      )
    );
  }

  return (
    <main className="cardPage">

      <h1>Crie seu NPC</h1>

      <form className="cardForm">

        <div className="formSection">
          <label>Nome</label>
          <input
            type="text"
            className="nomeNPC"
            placeholder="Nome"
          />
        </div>

        <div className="formSection">
          <label>Classe</label>
          <select name="classe" id="classe" />
        </div>

        <div className="formSection">
          <label>Raça</label>
          <select name="raca" id="raca" />
        </div>

        <div className="formSection">
          <label>Bússola Moral</label>
          <input
            type="text"
            className="moral"
            placeholder="Bússola Moral"
          />
        </div>

        <div className="formSection">
          <label>Equipamentos</label>
          <select
            name="equipamentos"
            id="equipamentos"
            multiple
          />
        </div>

        <div className="skillsBox">

          <button
            type="button"
            className="skillsCabecalho"
            onClick={() => setAberto(!aberto)}
          >
            <span>SKILLS</span>

            <span className={`seta ${aberto ? 'aberta' : ''}`}>
              ▼
            </span>

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
                    onChange={(e) =>
                      alterarValor(index, e.target.value)
                    }
                    className="skillValor"
                  />

                  <span className="skillNome">
                    {skill.nome}
                    <span className="skillAtributo">
                      ({skill.atributo})
                    </span>
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

        <div className="attributesGrid">

          <div className="attribute">
            <label>FOR</label>
            <input type="number" placeholder="Força" />
          </div>

          <div className="attribute">
            <label>DES</label>
            <input type="number" placeholder="Destreza" />
          </div>

          <div className="attribute">
            <label>CON</label>
            <input type="number" placeholder="Constituição" />
          </div>

          <div className="attribute">
            <label>INT</label>
            <input type="number" placeholder="Inteligência" />
          </div>

          <div className="attribute">
            <label>SAB</label>
            <input type="number" placeholder="Sabedoria" />
          </div>

          <div className="attribute">
            <label>CAR</label>
            <input type="number" placeholder="Carisma" />
          </div>

        </div>

        <div className="buttons">
          <button className="btnSalvar">
            Salvar
          </button>
        </div>

      </form>

    </main>
  );
}

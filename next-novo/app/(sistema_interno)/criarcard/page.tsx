'use client';

import { useState, useEffect } from 'react';
import "../sistema.css";
import "./criarcard.css";

interface NpcForm {
  nome: string;
  classe: string;
  raca: string;
  moral: string;
  equipamentos: string[];
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
}

interface Skill {
  nome: string;
  atributo: string;
  valor: number;
  selecionado: boolean;
}

export default function CreateCardPage() {
  const [aberto, setAberto] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [racas, setRacas] = useState<any[]>([]);
  const [npc, setNpc] = useState<NpcForm>({
    nome: "",
    classe: "",
    raca: "",
    moral: "",
    equipamentos: [],
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  });

  useEffect(() => {

      async function carregarDados() {

          try {

              const [skillsReq, classesReq, racasReq] = await Promise.all([
                  fetch("https://www.dnd5eapi.co/api/skills"),
                  fetch("https://www.dnd5eapi.co/api/classes"),
                  fetch("https://www.dnd5eapi.co/api/races")
              ]);

              const skillsData = await skillsReq.json();
              const classesData = await classesReq.json();
              const racasData = await racasReq.json();

              setSkills(
                  skillsData.results.map((item:any)=>({
                      nome:item.name,
                      atributo:"",
                      valor:0,
                      selecionado:false
                  }))
              );

              setClasses(classesData.results);
              setRacas(racasData.results);

          } catch(err){

              console.error(err);

          }

      }

      carregarDados();

  },[]);

  const [erros, setErros] = useState<Record<string, string>>({});

  function validarFormulario() {
      const novosErros: Record<string, string> = {};

      if (!npc.nome.trim()) {
          novosErros.nome = "Informe o nome.";
      } else if (npc.nome.length < 3) {
          novosErros.nome = "Nome muito curto.";
      }

      if (!npc.classe) {
          novosErros.classe = "Escolha uma classe.";
      }

      if (!npc.raca) {
          novosErros.raca = "Escolha uma raça.";
      }

      if (!npc.moral.trim()) {
          novosErros.moral = "Informe a moral.";
      }

      const atributos = [
          "forca",
          "destreza",
          "constituicao",
          "inteligencia",
          "sabedoria",
          "carisma"
      ] as const;

      atributos.forEach((atributo) => {
          const valor = npc[atributo];

          if (valor < 1 || valor > 20) {
              novosErros[atributo] =
                  "Valor deve ser entre 1 e 20.";
          }
      });

      const skillsSelecionadas =
          skills.filter(skill => skill.selecionado);

      if (skillsSelecionadas.length === 0) {
          novosErros.skills =
              "Selecione pelo menos uma skill.";
      }

      for (const skill of skillsSelecionadas) {

          if (skill.valor < 0 || skill.valor > 20) {

              novosErros.skills =
                  "Os valores das skills devem estar entre 0 e 20.";

              break;
          }
      }

      setErros(novosErros);

      return Object.keys(novosErros).length === 0;
  }

  function alternarSelecionado(index: number) {
    setSkills(prev =>
      prev.map((skill, i) =>
        i === index
          ? { ...skill, selecionado: !skill.selecionado }
          : skill
      )
    );
  }

  function alterarCampo(
    campo: keyof NpcForm,
    valor: string | number | string[]
  ) {
    setNpc(prev => ({
      ...prev,
      [campo]: valor,
    }));
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

  async function salvarNPC(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const body = {
      ...npc,
      skills: skills
        .filter(skill => skill.selecionado)
        .map(skill => skill.nome),

      userId: "", // será preenchido pela autenticação
    };

    try {
      const response = await fetch("/api/npcs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar NPC");
      }

      alert("NPC criado com sucesso!");

    } catch (error) {
      console.error(error);
      alert("Erro ao criar NPC.");
    }
  }

  return (
    <main className="cardPage">

      <h1>Crie seu NPC</h1>

      <form
        className="cardForm"
        onSubmit={salvarNPC}
        noValidate
      >

        <div className="formSection">
          <label>Nome</label>

          <input
            type="text"
            className="nomeNPC"
            placeholder="Nome"
            required
            minLength={3}
            maxLength={50}
            value={npc.nome}
            onChange={(e) => alterarCampo("nome", e.target.value)}
          />

          {erros.nome && <span className="erro">{erros.nome}</span>}
        </div>

        <div className="formSection">
          <label>Classe</label>

          <select
            id="classe"
            required
            value={npc.classe}
            onChange={(e) => alterarCampo("classe", e.target.value)}
          >
            <option value="">Selecione uma classe</option>

            {classes.map((classe) => (
              <option
                key={classe.index}
                value={classe.name}
              >
                {classe.name}
              </option>
            ))}
          </select>

          {erros.classe && <span className="erro">{erros.classe}</span>}
        </div>

        <div className="formSection">
          <label>Raça</label>

          <select
            id="raca"
            required
            value={npc.raca}
            onChange={(e) => alterarCampo("raca", e.target.value)}
          >
            <option value="">Selecione uma raça</option>

            {racas.map((raca) => (
              <option
                key={raca.index}
                value={raca.name}
              >
                {raca.name}
              </option>
            ))}
          </select>

          {erros.raca && <span className="erro">{erros.raca}</span>}
        </div>

        <div className="formSection">
          <label>Bússola Moral</label>

          <input
            type="text"
            className="moral"
            placeholder="Bússola Moral"
            required
            value={npc.moral}
            onChange={(e) => alterarCampo("moral", e.target.value)}
          />

          {erros.moral && <span className="erro">{erros.moral}</span>}
        </div>

        <div className="formSection">
          <label>Equipamentos</label>

          <input
            type="text"
            placeholder="Ex.: Espada, Escudo, Poção..."
            value={npc.equipamentos.join(", ")}
            onChange={(e) =>
              alterarCampo(
                "equipamentos",
                e.target.value
                  .split(",")
                  .map(item => item.trim())
                  .filter(item => item !== "")
              )
            }
          />

          {erros.equipamentos && (
            <span className="erro">{erros.equipamentos}</span>
          )}
        </div>

        <div className="skillsBox">

          <button
            type="button"
            className="skillsCabecalho"
            onClick={() => setAberto(!aberto)}
          >
            <span>SKILLS</span>

            <span className={`seta ${aberto ? "aberta" : ""}`}>
              ▼
            </span>

          </button>

          {aberto && (

            <div className="skillsLista">

              {skills.map((skill, index) => (

                <div
                  key={skill.nome}
                  className="skillLinha"
                >

                  <input
                    type="checkbox"
                    checked={skill.selecionado}
                    onChange={() => alternarSelecionado(index)}
                    className="skillCheckbox"
                  />

                  <input
                    type="number"
                    className="skillValor"
                    min={0}
                    max={20}
                    value={skill.valor}
                    onChange={(e) =>
                      alterarValor(index, e.target.value)
                    }
                  />

                  <span className="skillNome">
                    {skill.nome}

                    <span className="skillAtributo">
                      ({skill.atributo})
                    </span>
                  </span>

                </div>

              ))}

              {erros.skills && (
                <span className="erro">{erros.skills}</span>
              )}

            </div>

          )}

        </div>

        <div className="attributesGrid">

          <div className="attribute">
            <label>FOR</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.forca}
              onChange={(e) =>
                alterarCampo("forca", Number(e.target.value))
              }
            />

            {erros.forca && (
              <span className="erro">{erros.forca}</span>
            )}
          </div>

          <div className="attribute">
            <label>DES</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.destreza}
              onChange={(e) =>
                alterarCampo("destreza", Number(e.target.value))
              }
            />

            {erros.destreza && (
              <span className="erro">{erros.destreza}</span>
            )}
          </div>

          <div className="attribute">
            <label>CON</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.constituicao}
              onChange={(e) =>
                alterarCampo("constituicao", Number(e.target.value))
              }
            />

            {erros.constituicao && (
              <span className="erro">{erros.constituicao}</span>
            )}
          </div>

          <div className="attribute">
            <label>INT</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.inteligencia}
              onChange={(e) =>
                alterarCampo("inteligencia", Number(e.target.value))
              }
            />

            {erros.inteligencia && (
              <span className="erro">{erros.inteligencia}</span>
            )}
          </div>

          <div className="attribute">
            <label>SAB</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.sabedoria}
              onChange={(e) =>
                alterarCampo("sabedoria", Number(e.target.value))
              }
            />

            {erros.sabedoria && (
              <span className="erro">{erros.sabedoria}</span>
            )}
          </div>

          <div className="attribute">
            <label>CAR</label>

            <input
              type="number"
              min={1}
              max={20}
              value={npc.carisma}
              onChange={(e) =>
                alterarCampo("carisma", Number(e.target.value))
              }
            />

            {erros.carisma && (
              <span className="erro">{erros.carisma}</span>
            )}
          </div>

        </div>

        <div className="buttons">
          <button
            type="submit"
            className="btnSalvar"
          >
            Salvar
          </button>
        </div>

      </form>

    </main>
  )
}

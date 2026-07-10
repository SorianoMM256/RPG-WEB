"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../sistema.css";
// Se precisar, ajuste os caminhos dos CSS abaixo:
import "../../../(sistema_interno)/criarcard/criarcard.css";

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

export default function NpcViewEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // ESTADO QUE CONTROLA SE ESTAMOS VENDO OU EDITANDO
  const [modoEdicao, setModoEdicao] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [aberto, setAberto] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [racas, setRacas] = useState<any[]>([]);
  const [erros, setErros] = useState<Record<string, string>>({});

  const [npc, setNpc] = useState<NpcForm>({
    nome: "",
    classe: "",
    raca: "",
    moral: "",
    equipamentos: [],
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10,
  });

  useEffect(() => {
    async function carregarTudo() {
      try {
        const [skillsReq, classesReq, racasReq, npcReq] = await Promise.all([
          fetch("https://www.dnd5eapi.co/api/skills"),
          fetch("https://www.dnd5eapi.co/api/classes"),
          fetch("https://www.dnd5eapi.co/api/races"),
          fetch(`/api/npcs/${id}`), // Busca o NPC no nosso banco
        ]);

        const skillsData = await skillsReq.json();
        const classesData = await classesReq.json();
        const racasData = await racasReq.json();
        const npcData = await npcReq.json();

        setClasses(classesData.results);
        setRacas(racasData.results);

        setNpc({
          nome: npcData.name,
          classe: npcData.className,
          raca: npcData.race,
          moral: npcData.alignment,
          equipamentos: npcData.equipment ? npcData.equipment.split(",") : [],
          forca: npcData.strength,
          destreza: npcData.dexterity,
          constituicao: npcData.constitution,
          inteligencia: npcData.intelligence,
          sabedoria: npcData.wisdom,
          carisma: npcData.charisma,
        });

        const npcsSkills = npcData.skills ? npcData.skills.split(",") : [];
        setSkills(
          skillsData.results.map((item: any) => ({
            nome: item.name,
            atributo: "",
            valor: 0,
            selecionado: npcsSkills.includes(item.name),
          })),
        );

        setCarregando(false);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setCarregando(false);
      }
    }

    if (id) {
      carregarTudo();
    }
  }, [id]);

  function validarFormulario() {
    const novosErros: Record<string, string> = {};
    if (!npc.nome.trim()) novosErros.nome = "Informe o nome.";
    if (!npc.classe) novosErros.classe = "Escolha uma classe.";
    if (!npc.raca) novosErros.raca = "Escolha uma raça.";
    if (!npc.moral.trim()) novosErros.moral = "Informe a moral.";

    const skillsSelecionadas = skills.filter((skill) => skill.selecionado);
    if (skillsSelecionadas.length === 0) {
      novosErros.skills = "Selecione pelo menos uma skill no menu acima.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0)
      alert("Preencha todos os campos obrigatórios!");
    return Object.keys(novosErros).length === 0;
  }

  function alterarCampo(
    campo: keyof NpcForm,
    valor: string | number | string[],
  ) {
    setNpc((prev) => ({ ...prev, [campo]: valor }));
  }

  async function atualizarNPC(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validarFormulario()) return;

    const body = {
      ...npc,
      skills: skills
        .filter((skill) => skill.selecionado)
        .map((skill) => skill.nome),
    };

    try {
      const response = await fetch(`/api/npcs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erro ao atualizar NPC");

      alert("NPC atualizado com sucesso!");
      setModoEdicao(false); // Volta para o modo de visualização!
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar para o banco de dados.");
    }
  }

  if (carregando) {
    return (
      <main className="cardPage">
        <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Carregando NPC...
        </h2>
      </main>
    );
  }

  // ==========================================
  // MODO VISUALIZAÇÃO (Igual ao Modal da sua amiga)
  // ==========================================
  if (!modoEdicao) {
    return (
      <main
        className="cardPage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="modal-pergaminho"
          style={{ position: "relative", width: "90%", maxWidth: "500px" }}
        >
          <button
            className="btn-fechar-modal"
            onClick={() => router.push("/principal")}
            style={{ position: "absolute", top: "15px", right: "15px" }}
          >
            Voltar
          </button>

          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            {npc.nome}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="/avatar.png"
              alt={npc.nome}
              className="modal-avatar"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>

          <div className="modal-status-grade">
            <p>
              <strong>Classe:</strong> {npc.classe}
            </p>
            <p>
              <strong>Raça:</strong> {npc.raca}
            </p>
            <p>
              <strong>Moral:</strong> {npc.moral}
            </p>
            <hr />
            <div
              className="atributos-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                textAlign: "center",
              }}
            >
              <p>STR: {npc.forca}</p>
              <p>DEX: {npc.destreza}</p>
              <p>CON: {npc.constituicao}</p>
              <p>CHA: {npc.carisma}</p>
              <p>INT: {npc.inteligencia}</p>
              <p>WIS: {npc.sabedoria}</p>
            </div>
            <hr />
            <div className="infos-extras">
              <p>
                <strong>Skills:</strong>{" "}
                {skills
                  .filter((s) => s.selecionado)
                  .map((s) => s.nome)
                  .join(", ") || "Nenhuma"}
              </p>
              <p>
                <strong>Equipamentos:</strong>{" "}
                {npc.equipamentos.length > 0
                  ? npc.equipamentos.join(", ")
                  : "Nenhum"}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "25px",
                justifyContent: "center",
              }}
            >
              <button
                className="btn-ex"
                onClick={() => setModoEdicao(true)}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Editar Informações
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // MODO EDIÇÃO (O Formulário)
  // ==========================================
  return (
    <main className="cardPage">
      <h1>Editando: {npc.nome}</h1>

      <form className="cardForm" onSubmit={atualizarNPC} noValidate>
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
            required
            value={npc.classe}
            onChange={(e) => alterarCampo("classe", e.target.value)}
          >
            <option value="">Selecione uma classe</option>
            {classes.map((classe) => (
              <option key={classe.index} value={classe.name}>
                {classe.name}
              </option>
            ))}
          </select>
        </div>

        <div className="formSection">
          <label>Raça</label>
          <select
            required
            value={npc.raca}
            onChange={(e) => alterarCampo("raca", e.target.value)}
          >
            <option value="">Selecione uma raça</option>
            {racas.map((raca) => (
              <option key={raca.index} value={raca.name}>
                {raca.name}
              </option>
            ))}
          </select>
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
        </div>

        <div className="formSection">
          <label>Equipamentos</label>
          <input
            type="text"
            placeholder="Ex.: Espada, Escudo"
            value={npc.equipamentos.join(", ")}
            onChange={(e) =>
              alterarCampo(
                "equipamentos",
                e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item !== ""),
              )
            }
          />
        </div>

        <div className="skillsBox">
          <button
            type="button"
            className="skillsCabecalho"
            onClick={() => setAberto(!aberto)}
          >
            <span>SKILLS</span>
            <span className={`seta ${aberto ? "aberta" : ""}`}>▼</span>
          </button>

          {aberto && (
            <div className="skillsLista">
              {skills.map((skill, index) => (
                <div key={skill.nome} className="skillLinha">
                  <input
                    type="checkbox"
                    checked={skill.selecionado}
                    onChange={() =>
                      setSkills((prev) =>
                        prev.map((s, i) =>
                          i === index
                            ? { ...s, selecionado: !s.selecionado }
                            : s,
                        ),
                      )
                    }
                    className="skillCheckbox"
                  />
                  <span className="skillNome">{skill.nome}</span>
                </div>
              ))}
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
              onChange={(e) => alterarCampo("forca", Number(e.target.value))}
            />
          </div>
          <div className="attribute">
            <label>DES</label>
            <input
              type="number"
              min={1}
              max={20}
              value={npc.destreza}
              onChange={(e) => alterarCampo("destreza", Number(e.target.value))}
            />
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
          </div>
          <div className="attribute">
            <label>CAR</label>
            <input
              type="number"
              min={1}
              max={20}
              value={npc.carisma}
              onChange={(e) => alterarCampo("carisma", Number(e.target.value))}
            />
          </div>
        </div>

        <div className="buttons" style={{ display: "flex", gap: "15px" }}>
          <button
            type="button"
            className="btnSalvar"
            onClick={() => setModoEdicao(false)}
            style={{ backgroundColor: "gray" }}
          >
            Cancelar
          </button>
          <button type="submit" className="btnSalvar">
            Salvar Alterações
          </button>
        </div>
      </form>
    </main>
  );
}

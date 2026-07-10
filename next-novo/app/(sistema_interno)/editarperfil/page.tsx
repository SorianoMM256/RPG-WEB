"use client";
import { Suspense, useState, useRef, useActionState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Upload, Loader2, Edit } from "lucide-react";
import "../sistema.css";
import "./editarperfil.css";
import { editarPerfil, type FormState } from "@/actions/editarperfil";
import { getUsuarioLogado } from "@/actions/usuariologado";

//definir o que o frontend vai ficar pegando e retornando para o backend
const initialState: FormState = {
  msg: "",
  sucesso: false,
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EditarPerfil />
    </Suspense>
  );
}

// os parametros servem pra receber as propriedades
function EditarPerfil({ fotoInicial }: { fotoInicial?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modalAberto = searchParams.get("upload") === "true";

  //funcao pra receber as alteracoes feitas e a pagina se adaptar
  const [state, formAction, pending] = useActionState(
    editarPerfil,
    initialState,
  ); //importa a funcao e o estado inicial antes das alteracoes

  //funcao para receber os alertas
  const [alerta, setAlerta] = useState<{
    msg: string;
    tipo: "erro" | "sucesso";
  } | null>(null);

  // ==========================================================================
  // NOVO EFEITO: Monitora o resultado do envio para mostrar o alerta e avisar o layout
  // ==========================================================================
  useEffect(() => {
    if (state?.msg) {
      // Ativa o alerta na tela com a mensagem que veio do seu arquivo .ts
      setAlerta({
        msg: state.msg,
        tipo: state.sucesso ? "sucesso" : "erro",
      });

      if (state.sucesso) {
        // DISPARA O SINAL: Avisa o Layout que a foto e dados mudaram no banco!
        window.dispatchEvent(new Event("perfilAtualizado"));

        // Aguarda 2 segundos para o usuário ver o alerta de sucesso e fecha o modal
        const timer = setTimeout(() => {
          fecharModal();
          setAlerta(null);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [state]);

  //efeito
  useEffect(() => {
    async function carregarFoto() {
      // Chama a Server Action direto, sem precisar de fetch ou /api/
      const dados = await getUsuarioLogado();

      if (dados) {
        setUsAtual(dados);

        if (dados.foto) {
          setImagemPreview(dados.foto);
        }
      }
    }

    if (modalAberto) {
      carregarFoto();
    }
  }, [modalAberto]);

  const [imagemPreview, setImagemPreview] = useState<string | null>(
    fotoInicial || null,
  );

  //pega o atual usuario
  const [usAtual, setUsAtual] = useState<{
    nome?: string;
    email?: string;
    foto?: string | null;
  } | null>(null);

  const [enviando, setEnviando] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  function fecharModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("upload");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleUploadClick() {
    inputFileRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);
    setImagemPreview(url);
  }

  return (
    <main>
      {modalAberto && (
        <div className="overlay" onClick={fecharModal}>
          <div
            className="modalEditarPerfil"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="botaoFechar" onClick={fecharModal}>
              X
            </button>

            <h2 className="titulo">EDITAR PERFIL</h2>

            <div className="conteudoModal">
              <button
                className="avatarUpload"
                onClick={handleUploadClick}
                disabled={enviando}
              >
                {imagemPreview ? (
                  <img src={imagemPreview} alt="Foto de perfil" />
                ) : (
                  <Upload size={32} />
                )}
                {enviando && (
                  <div className="overlayLoading">
                    <Loader2 size={24} className="animate-spin" />
                  </div>
                )}
              </button>

              <div className="A2">
                {/* ALERTA */}
                {alerta && (
                  <div className={`alerta-container ${alerta.tipo}`}>
                    {""}
                    <span className="alerta-icone">
                      {alerta.tipo === "sucesso" ? "✓" : "⚠"}
                    </span>
                    <p className="alerta-texto">{alerta.msg}</p>
                  </div>
                )}

                {/* FORMMMMMMMSS */}
                <form action={formAction}>
                  <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <div className="campos">
                    <input
                      type="text"
                      name="nome"
                      className="nome"
                      placeholder="Nome de usuário"
                      defaultValue={usAtual?.nome} // preenche com o nome do banco
                      key={`nome-${usAtual?.nome}`}
                    />
                    <input
                      type="email"
                      name="email"
                      className="email"
                      placeholder="Email"
                      defaultValue={usAtual?.email} // 👈 Preenche com o email do banco
                      key={`email-${usAtual?.email}`} // força o React a atualizar quando o dado chegar
                    />
                  </div>

                  <button className="Botao" type="submit" disabled={pending}>
                    {pending ? "Salvando...." : "Salvar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

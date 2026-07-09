"use client";
import { Suspense, useState, useRef, useActionState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Upload, Loader2, Edit } from "lucide-react";
import "../sistema.css";
import "./editarperfil.css";
import { editarPerfil, type FormState } from "@/actions/editarperfil";

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

function EditarPerfil() {
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

  //efeito
  useEffect(() => {
    if (state?.msg) {
      //cria alerta
      setAlerta({
        msg: state.msg,
        tipo: state.sucesso ? "sucesso" : "erro",
      });

      const timer = setTimeout(() => {
        setAlerta(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
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

    try {
      setEnviando(true);

      const formData = new FormData();
      formData.append("file", arquivo);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha no upload");
      }

      const data = await response.json();
      console.log("Upload concluído:", data);
      setImagemPreview(data.url);
    } catch (erro) {
      console.error("Erro ao enviar imagem:", erro);
      alert("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setEnviando(false);
    }
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

              <input
                type="file"
                accept="image/*"
                ref={inputFileRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
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

                <form action={formAction}>
                  <div className="campos">
                    <input
                      type="text"
                      className="nome"
                      placeholder="Nome de usuário"
                    />
                    <input type="email" className="email" placeholder="Email" />
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

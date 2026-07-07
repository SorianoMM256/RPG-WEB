'use client';
import { Suspense, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Upload, Loader2, Edit } from 'lucide-react';
import "../sistema.css";
import "./editarperfil.css"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EditarPerfil />
    </Suspense>
  );
}

function EditarPerfil(){

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const modalAberto = searchParams.get('upload') === 'true';

    const [imagemPreview, setImagemPreview] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    function fecharModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('upload');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    }

    function handleUploadClick() {inputFileRef.current?.click();}

      async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);
    setImagemPreview(url);

    try {
      setEnviando(true);

      const formData = new FormData();
      formData.append('file', arquivo);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha no upload');
      }

      const data = await response.json();
      console.log('Upload concluído:', data);
      setImagemPreview(data.url);
    } catch (erro) {
      console.error('Erro ao enviar imagem:', erro);
      alert('Não foi possível enviar a imagem. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  
    return(
        <main>
            {modalAberto && (
        <div className="overlay" onClick={fecharModal}>
        <div className="modalEditarPerfil" onClick={(e) => e.stopPropagation()}>
          
          <button className="botaoFechar" onClick={fecharModal}>X</button>

          <h2 className="titulo">EDITAR PERFIL</h2>

          <div className="conteudo">
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
              style={{ display: 'none' }}
            />

            <div className="campos">
              <input type="text"className="nome"placeholder="Nome de usuário"/>
              <input type="email"className="email"placeholder="Email"/>
            </div>
          </div>
          </div>
          </div>
)}
  </main>
);
}
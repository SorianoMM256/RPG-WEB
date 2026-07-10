"use client";

import { useActionState, useEffect, useState } from "react";
import "../globals.css";
import "./criar.css";
import { criarConta, type FormState } from "@/actions/criarconta"; // chama a funcao e oq vai usar dela!
import { useRouter } from "next/navigation"; //o default eh importar next/router, mas ROUTER da erro

//precisa tipar a funcao para que seja enviado e retornado infos com o mesmo formato!
const initialState: FormState = {
  msg: "",
  sucesso: false,
  fields: { nome: "", email: "" },
}; //msg inicial!!!

export default function Login() {
  //funcao pra redirecionar caso cancele!!!
  const router = useRouter();

  //eh aqui que pegamos a funcao que vai fazer a pagina funcionar!
  //os HOOKS (Use...) so podem ser chamados dentro do corpo principal
  const [state, formAction, pending] = useActionState(criarConta, initialState);

  const [alerta, setAlerta] = useState<{
    msg: string;
    tipo: "erro" | "sucesso";
  } | null>(null);

  useEffect(() => {
    // o ?. serve para verificar se TEM algo novo.
    if (state?.msg) {
      //cria o alerta!
      setAlerta({
        msg: state.msg,
        tipo: state.sucesso ? "sucesso" : "erro",
      });

      //redirecionamento!
      // PRECISA FAZER AQUI, ja que so entra caso haja VALIDAÇÃO
      if (state.sucesso) {
        const timerRouter = setTimeout(() => {
          router.push("/login");
        });
      }

      //bomba relogio! pra sumir a msg
      const timer = setTimeout(() => {
        setAlerta(null);
      }, 4000);

      //limpa o temporizador caso clique dnv
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <main>
      <div className="CriarBox">
        <img src="/teste.png" id="logo"></img>
        {/* verifica se alerta existe */}
        {alerta && (
          <div className={`alerta-container ${alerta.tipo}`}>
            {" "}
            {/* serve p ver se eh erro ou sucesso!!! muda a variavel*/}
            <span className="alerta-icone">
              {alerta.tipo === "sucesso" ? "✓" : "⚠"}
            </span>
            <p className="alerta-texto">{alerta.msg}</p>
          </div>
        )}
        <form action={formAction}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            defaultValue={state?.fields?.nome}
          ></input>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={state?.fields?.email}
          ></input>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha"></input>
          <label htmlFor="confirmacao">Confirme a senha:</label>
          <input type="password" id="confirmacao" name="confirmacao"></input>
          {/* EXPLICANDO O DISABLED. pending significa "o formulario esta sendo enviado?"
          se sim, mostra o CRIANDO.... se não, mostra CRIAR */}
          <button className="btncriar" type="submit" disabled={pending}>
            {pending ? "Criando..." : "Criar"}
          </button>
          {/* o tipo de cancelar PRECISA ser "button", senao ele da submit (opcao default)! */}
          <button
            className="btncancelar"
            type="button"
            onClick={() => router.push("/inicio")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </main>
  );
}

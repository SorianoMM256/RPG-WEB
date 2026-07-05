"use client";

import { useActionState } from "react";
import "../globals.css";
import "./criar.css";
import { criarConta, type FormState } from "@/actions/criarconta"; // chama a funcao e oq vai usar dela!

//precisa tipar a funcao para que seja enviado e retornado infos com o mesmo formato!
const initialState: FormState = {
  msg: "",
  fields: { nome: "", email: "" },
}; //msg inicial!!!

export default function Login() {
  //eh aqui que pegamos a funcao que vai fazer a pagina funcionar!
  //os HOOKS (Use...) so podem ser chamados dentro do corpo principal
  const [state, formAction, pending] = useActionState(criarConta, initialState);

  return (
    <main>
      <div className="CriarBox">
        <img src="/teste.png" id="logo"></img>
        {state?.msg && <p>{state.msg}</p>}
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
          <button className="btncancelar" type="button">
            Cancelar
          </button>
        </form>
      </div>
    </main>
  );
}

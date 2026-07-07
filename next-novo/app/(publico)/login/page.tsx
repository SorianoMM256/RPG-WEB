"use client";

import { useActionState, useEffect, useState } from "react";
import "../globals.css";
import "./login.css";

import { login, type FormState } from "@/actions/login";
import { useRouter } from "next/navigation"; //se usar o next/router da erro

//tipar a funcao novamente!
const initialState: FormState = {
  msg: "",
  sucesso: false,
  email: "",
};

export default function Login() {
  // funcao para redirecionar para tela inicial ao CANCELAR
  const router = useRouter();

  // 1. pegamos a funcao que vai fazer a pagina funcionar

  //precisa usar action state pois eh await
  const [state, formAction, pending] = useActionState(login, initialState);

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
      <div className="LoginBox">
        <img src="/teste.png" id="logo"></img>
        {/* verificar se o alerta existe: */}
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
          <label htmlFor="loginemail">Email:</label>
          <input
            type="text"
            id="loginemail"
            name="email"
            defaultValue={state?.email}
          ></input>
          <label htmlFor="loginsenha">Senha:</label>
          <input type="password" id="loginsenha" name="senha"></input>

          <button type="submit" className="btnlogar" disabled={pending}>
            {pending ? "Entrando..." : "Entrar"} {/* Ou um ou outro! */}
          </button>

          {/* importante tipar como BUTTON, senao qualquer botao eh submit por default */}
          <button
            className="btncancelarlogin"
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

import Link from "next/link";
import "../globals.css";
import "./home.css";

export default async function Home() {
  /* TREM PRA VER O QUE A API FORNECE
  const a = await fetch("https://www.dnd5eapi.co/api/2014/");
  const aa = await a.json();
  console.log(aa);*/

  return (
    <main className="pagina">
      <img src="/Jedi.png" id="foto"></img>
      <div className="A2">
        <div className="texto">
          <h1>Seja Bem-Vindo Viajante</h1>
          <p className="upgrade">De um upgrade no seu RPG</p>
        </div>
        <Link href="/criarconta" className="criarConta">
          Criar Conta
        </Link>
      </div>
    </main>
  );
}

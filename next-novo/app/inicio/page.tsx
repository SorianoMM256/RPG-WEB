import Link from "next/link";
import "../globals.css";
import "./home.css"

export default function Home(){
    return(
        <main className = "pagina">
            <img src="/Jedi.png" id="foto"></img>
            <div className='A2'>
            <div className="texto">
            <h1>Seja Bem-Vindo Viajante</h1>
            <p>De um upgrade no seu RPG</p>
            </div>
            <Link href="/create" className="criarConta">Criar Conta</Link>
            </div>
        </main>
    );
}
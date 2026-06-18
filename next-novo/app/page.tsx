import Link from "next/link";

export default function Home(){
    return(
        <main className = "pagina">
            <img src="/Jedi.png" id="foto"></img>
            <div className='texto'>
            <h1>Seja Bem-Vindo Viajante</h1>
            <p>De um upgrade no seu RPG</p>
            <Link href="/create" className="criarConta">Criar Conta</Link>
            </div>
        </main>
    );
}
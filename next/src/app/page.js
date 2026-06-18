import Link from "next/link";

export default function Home(){
    return(
        <main className = "pagina">
            <img src="/Jedi.png" id="foto"></img>
            <div class='texto'>
            <h1>Seja Bem-Vindo Viajante</h1>
            <p>De um upgrade no seu RPG</p>
            <Link href="/create" class="criarConta">Criar Conta</Link>
            </div>
        </main>
    );
}
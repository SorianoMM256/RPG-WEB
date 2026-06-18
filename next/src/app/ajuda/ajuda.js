import Link from "next/link";

export default function Ajuda(){
    return(
        <main className = "pagina">
            <img src="./public/Jedi.png" id="foto"></img>
            <div class='texto'>
            <h1>Seja Bem-Vindo Viajante</h1>
            <p>De um upgrade no seu RPG</p>
            <a href="./links/create.html" class="criarConta">Criar Conta</a>
            </div>
        </main>
    );
}
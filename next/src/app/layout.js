import "./globals.css";
import Link from "next/link";

export default function RootLayout({filho}){
    return (
        <html lang = "pt-br">
            <body>
            <header>
            <img src= "/teste.png" id="nome"/>

            <nav className="menu-nav">
            <Link href="/sobre" class="Sobre">Sobre</Link>
            <Link href="/equipe" class="Equipe">Equipe</Link>
            <Link href="/ajuda" class="Ajuda">Ajuda</Link>
            </nav>
            <Link href="/login" class="login">Login</Link>
            </header>
            {filho}
            </body>
        </html>
    );
}
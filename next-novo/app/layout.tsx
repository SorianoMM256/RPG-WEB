import "./globals.css";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  filho: React.ReactNode;
}

export default function RootLayout({filho}:LayoutProps){
    return (
        <html lang = "pt-br">
            <body>
            <header>
            <img src= "/teste.png" id="nome"/>

            <nav className="menu-nav">
            <Link href="/sobre" className="Sobre">Sobre</Link>
            <Link href="/equipe" className="Equipe">Equipe</Link>
            <Link href="/ajuda" className="Ajuda">Ajuda</Link>
            </nav>
            <Link href="/login" className="login">Login</Link>
            </header>
            {filho}
            </body>
        </html>
    );
}
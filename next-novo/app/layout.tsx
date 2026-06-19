import "./globals.css";
import Link from "next/link";
import React from "react";
import { MedievalSharp } from 'next/font/google';

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}:LayoutProps){
    return (
        <html lang = "pt-br">
            <body>
            <header>
            <img src= "/teste.png" id="nome"/>

            <nav className="menu-nav">
            <Link href="/inicio" className="Home">Home</Link>    
            <Link href="/sobre" className="Sobre">Sobre</Link>
            <Link href="/equipe" className="Equipe">Equipe</Link>
            <Link href="/ajuda" className="Ajuda">Ajuda</Link>
            </nav>
            <Link href="/login" className="login">Login</Link>
            </header>
            {children}
            </body>
        </html>
    );
}
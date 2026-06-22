'use client';

import "./sistema.css";
import Link from "next/link";
import {use, useState} from "react";
import { MedievalSharp } from 'next/font/google';

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}:LayoutProps){

    const [menuAberto,setMenuAberto] = useState(false);
    return (
        <html lang = "pt-br">
            <body>

            <header>
            <img src= "/teste.png" id="logo"/>

            <nav className="menu-nav">
            <Link href="/Tutorial" className="Home">Tutorial</Link>    
            </nav>
            <button className="btnperfil" onClick={() => setMenuAberto(!menuAberto)}><img src="/avatar.png" className="avatar"></img></button>
            {menuAberto && (
                <div className="menuzinho">
                   <Link href="/verPerfil" className="Home">Ver Perfil</Link>
                   <Link href="/editarPerfil" className="Home">Editar Perfil</Link>
                   <Link href="/logout" className="Home">Exit</Link> 
                </div>
            )}
            </header>

            <aside>
            <nav className="side-bar">
            <Link href="/meusCards" className="Cards">Meus Cards</Link>    
            <Link href="/feedback" className="Feedback">Seu Feedback</Link>
            </nav>
            </aside>

            <main>{children}</main>
            </body>
        </html>
    );
}
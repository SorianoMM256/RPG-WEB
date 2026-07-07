'use client';

import "./sistema.css";
import Link from "next/link";
import {use, useState} from "react";
import { MedievalSharp } from 'next/font/google';
import { useRouter } from 'next/navigation';

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children}:LayoutProps){

    const router = useRouter();

    function abrirModal() {
    router.push('/editarperfil?upload=true');
    }

    const [menuAberto,setMenuAberto] = useState(false);
    return (
        <html lang = "pt-br">
            <body>

            <header>
            <img src= "/teste.png" id="logo"/>

            <nav className="menu-nav">
            <Link href="/tutorial" className="tutorial">Tutorial</Link>    
            </nav>
            <div className="container-avatar">
            <button className="btnperfil" onClick={() => setMenuAberto(!menuAberto)}><img src="/avatar.png" className="avatar" id="avatar"></img></button>
            
            {menuAberto && (
                <div className="menuzinho">
                   <Link href="/verperfil" className="ver">Ver Perfil</Link>
                   <button onClick={abrirModal} className="editar">Editar Perfil</button>
                   <Link href="/logout" className="logout">Exit</Link> 
                </div>
            )}
            </div>
            </header>

            <div className="conteudo">
            <aside>
            <nav className="side-bar">
            <Link href="/meuscads" className="Cards">Meus Cards</Link>    
            <Link href="/feedback" className="Feedback">Seu Feedback</Link>
            </nav>
            </aside>

            <main className="main_interno">{children}</main>
            </div>

            </body>
        </html>
    );
}
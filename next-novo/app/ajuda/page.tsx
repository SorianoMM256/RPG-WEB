import Link from "next/link";
import "../globals.css";
import "./ajuda.css"

export default function Equipe(){
    return(
        <main>

        <div className='contato'>
        <div className="dados">
        <p className='titulo-problema'>Caso surjam problemas entre em contato com:</p>
        <div className="contatos-lista">
        <p className="item-contato">🐉 (35) 99107-5487 - 🌶️ mariaesantana2006@gmail.com</p>
        <p className="item-contato">🦕 (35) 99190-2867 - 🦦 sofianogueirabatista@gmail.com </p>
        <p className="item-contato">🥔 (35) 99831-1445 - ☕ matheusmottasoriano@gmail.com</p>
        </div>
        </div>
        </div>
        </main>
    );
}
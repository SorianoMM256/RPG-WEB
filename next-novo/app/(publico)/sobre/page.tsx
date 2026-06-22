import Link from "next/link";
import "../globals.css";
import "./sobre.css"

export default function Equipe(){
    return(
        <main className = "ajuda">

        <div className='sobre'>
        <p className="paragrafo-sobre destaque">Este site foi desenvolvido com o objetivo de auxiliar mestres e jogadores de RPG na criação rápida personagens.</p>
        <p className="paragrafo-sobre corpo"> A ferramenta gera personagens com características variadas, ajudando a enriquecer campanhas, improvisar encontros e tornar as aventuras mais dinâmicas.</p>
        <p className="paragrafo-sobre corpo">O projeto foi criado como parte de uma atividade acadêmica da disciplina ministrada pelo professor Phylipe Francisco, da Universidade Federal de Itajubá (UNIFEI). Além de aplicar conceitos de desenvolvimento web, o sistema busca oferecer uma solução prática e acessível para a comunidade de RPG.</p>
        <p className="paragrafo-sobre destaque">Nosso objetivo é unir tecnologia e criatividade, facilitando a construção de histórias e experiências de jogo mais envolventes.</p>
        </div>
         
        </main>
    );
}
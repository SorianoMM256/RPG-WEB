import Link from "next/link";
import "../globals.css";
import "./sobre.css"

export default function Equipe(){
    return(
        <main className = "ajuda">

        <div className='sobre'>
        <p id='p1'>Este site foi desenvolvido com o objetivo de auxiliar mestres e jogadores de RPG na criação rápida de NPCs (Personagens Não Jogáveis) aleatórios.</p>
        <p id='p2'> A ferramenta gera personagens com características variadas, ajudando a enriquecer campanhas, improvisar encontros e tornar as aventuras mais dinâmicas.</p>
        <p id = 'p3'>O projeto foi criado como parte de uma atividade acadêmica da disciplina ministrada pelo professor Phylipe Francisco, da Universidade Federal de Itajubá (UNIFEI). Além de aplicar conceitos de desenvolvimento web, o sistema busca oferecer uma solução prática e acessível para a comunidade de RPG.</p>
        <p id='p4'>Nosso objetivo é unir tecnologia e criatividade, facilitando a construção de histórias e experiências de jogo mais envolventes.</p>
        </div>
         
        </main>
    );
}
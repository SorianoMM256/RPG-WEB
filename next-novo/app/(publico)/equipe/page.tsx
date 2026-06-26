import Link from "next/link";
import "../globals.css";
import "./equipe.css"

export default function Equipe(){
    return(
        <main>
            
            <div className="Santana">
                <div className='conteudo'>
                <div className="icon"><img src="/02.png" alt="Personagem" /></div>
                <div className="info">
                <p className='titulo-personagem'>Maria Eduarda de Jesus Santana</p>
                <p className= 'texto-info'> Graduanda em Sistemas de Informação Bacharelado pela Universidade Federal de Itajubá - UNIFEI. <br></br>
                <br></br>
                💻 - <Link className= 'link01' href='https://github.com/MSantanas' target="_blank">GitHub</Link>
                </p>
                </div>
                </div>
            </div>

            <div className="Matheus">
                <div className='conteudo'>
                <div className="icon"><img src="/02.jpg" alt="Personagem" /></div>
                <div className="info">
                <p className="titulo-personagem">Matheus Motta Soriano</p>
                <p className="texto-info">Graduando em Sistemas de Informação Bacharelado pela Universidade Federal de Itajubá - UNIFEI. Técnico em TI pelo IFSuldeMinas <br></br>
                <br></br>
                💻 - <Link className= 'link02' href='https://github.com/SorianoMM256' target="_blank">GitHub</Link> <br></br>
                💡 - <Link className= 'link03' href='https://www.linkedin.com/in/matheus-motta-soriano-2a179b312/' target="_blank">LinkedIn</Link></p>
                </div>
                </div>
            </div>

            

            <div className="Sofia">
                <div className='conteudo'>
                <div className="icon"><img src="/03.png" alt="Personagem" /></div>
                <div className="info">
                <p className="titulo-personagem">Sofia Nogueira Batista</p>
                <p className="texto-info">Graduanda em Sistemas de Informação Bacharelado pela Universidade Federal de Itajubá - UNIFEI.<br></br>
                <br></br>
                💻 - <Link className= 'link04' href='https://github.com/SofiaNogbt' target="_blank" >GitHub</Link> <br></br>
                💡 - <Link className= 'link05' href='https://www.linkedin.com/in/sofia-nogueira-batista-740870381/' target="_blank">LinkedIn</Link> <br></br>
                🎮 - <Link className= 'link06' href='https://sunset-sky.itch.io' target="_blank">itch.io</Link></p>
                </div>
                </div>
            </div>
            
        </main>

    );
}
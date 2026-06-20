import Link from "next/link";
import "../globals.css";
import "./equipe.css"

export default function Equipe(){
    return(
        <main>
            
            <div className="Santanas">
                <div className='conteudo'>
                <div className="icon"><img src="/01.jpg" alt="Personagem" /></div>
                <div className="info">
                <p className='titulo-personagem'>Maria Eduarda de Jesus Santana</p>
                <p className= 'texto-info'>Que vai me ver em todo lugar.
                    Vai desenhar meu olhar no céu
                    Que meu amor tem gosto de mel
                    Parei de brincar, só vou se você
                    Meu patuá, meu azul-pincel
                    Pra me pintar de colorido
                    Mas é só me soltar, que eu volto a ser
                    Serpente no mar profundo
                    É que eu 'to com medo
                    É que eu não sou pura
                    Você vai se entregar, e eu vou te amar
                    Mas eu não quero ser sua</p>
                </div>
                </div>
            </div>

            <div className="Mathos">
                <div className='conteudo'>
                <div className="icon"><img src="/02.jpg" alt="Personagem" /></div>
                <div className="info">
                <p className="titulo-personagem">Matheus Motta Soriano</p>
                <p className="texto-info">Se droga fosse álcool eu morria de cirrose
                Se álcool fosse droga eu morria de overdose

                Sou vampiro doidão, sou o vampiro doidão
                Eu to muito louco, etá baseado do bom!

                Estava no escurinho, comendo a empregada
                alguém abriu a porta e eu comi a bunda errada

                Eu sou o vampiro doidão, eu sou o vampiro doidão
                Só faço sexo dentro do caixão</p>
                </div>
                </div>
            </div>

            

            <div className="OHomiDasCarcaErguida">
                <div className='conteudo'>
                <div className="icon"><img src="/03.jpg" alt="Personagem" /></div>
                <div className="info">
                <p className="titulo-personagem">Sofia Nogueira Batista</p>
                <p className="texto-info">Tu me traíste com o preto do cigano
                Agora vou te arrebentar o cu com o cano
                Vou te partir as teclas desse piano
                E a tua cona cheira a frango

                És uma putinha da vida
                Que só quer é putaria
                Mas agora apanhaste SIDA
                E quem fuder contigo é suicida</p>
                </div>
                </div>
            </div>
            
        </main>

    );
}
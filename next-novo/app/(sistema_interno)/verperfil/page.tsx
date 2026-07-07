import Link from "next/link";
import "../sistema.css";
import "./verperfil.css"

export default function VerPerfil(){
    return(
        <main>
            
            <div className="cabeca">
                <div className="img"><button type="submit"> <img src="01.jpg" width="50"/></button></div>
                <div className="info">
                    <h3>Perfil</h3>
                    <h1> Nome Usuário </h1>
                    <h3><span>8 </span>Cards</h3>
                </div>
            </div>

            <div className="corpo">
                <h2> Cards Criados </h2>
            </div>
            
        </main>

    );
}
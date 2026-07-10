import Link from "next/link";
import "../sistema.css";
import "./verperfil.css"

export default function VerPerfil(){
    return(
        <main>
            
            <div className="cabeca">
                <div className="imgpag"><button type="submit"> <img src="01.jpg" width="50"/></button></div>
                <div className="infopag">
                    <h3 className="h3_1">Perfil</h3>
                    <h1 className="h1_1"> <span>Nome Usuário</span> </h1>
                    <h3 className="h3_2"><span>8 </span>Cards</h3>
                </div>
            </div>

            <div className="corpo">
                <h2> Cards Criados </h2>
            </div>
            
        </main>

    );
}
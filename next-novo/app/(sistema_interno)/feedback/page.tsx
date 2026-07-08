import "../sistema.css";
import "./feedback.css"

export default function Equipe(){
    return(
        <main>

        <div className='feedback'>
        <p className='titulo-problema'>Bom te ver por aqui viajante! Que tal dar um feedback sobre o que achou da página?</p>
        <form>
            <textarea className="feedbackinput" wrap="soft"></textarea>
            <button className="btn">Enviar</button>
        </form>
        </div>

        </main>
    );
}
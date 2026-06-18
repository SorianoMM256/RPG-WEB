import Link from "next/link";

export default function Login(){
    return(
        <main>

            <button>Criar</button>
            
            <div className="LoginBox">
                <img src= "/public/teste.png" id="nome"></img>
                <label htmlFor="nome">Nome:</label>
                <input type='text' id="nome" name = 'nome'></input>
                <label htmlFor="email">Email:</label>
                <input type='text' id="email" name = 'email'></input>
                <label htmlFor="senha">Senha:</label>
                <input type='text' id="senha" name = 'senha'></input>
                <label htmlFor="confirmacao">Confirme a senha:</label>
                <input type='text' id="confirmacao" name = 'confirmacao'></input>

                <button>Criar</button>
                <button>Cancelar</button>
            </div>
        </main>
    );
}
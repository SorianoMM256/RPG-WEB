import Link from "next/link";

export default function Login(){
    return(
        <main className = "login">
            <div className="LoginBox">
                <img src= "/public/teste.png" id="nome"></img>
                <label for="nome">Nome:</label>
                <input type='text' id="nome" name = 'nome'></input>
            </div>
        </main>
    );
}
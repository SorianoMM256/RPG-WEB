import "../globals.css";
import "./criar.css";

export default function Login() {
  return (
    <main>
      <div className="CriarBox">
        <img src="/teste.png" id="logo"></img>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome"></input>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email"></input>
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha"></input>
        <label htmlFor="confirmacao">Confirme a senha:</label>
        <input type="password" id="confirmacao" name="confirmacao"></input>

        <button className="btncriar">Criar</button>
        <button className="btncancelar">Cancelar</button>
      </div>
    </main>
  );
}

import "../globals.css";
import "./login.css";

export default function Login() {
  return (
    <main>
      <div className="LoginBox">
        <img src="/teste.png" id="logo"></img>
        <label htmlFor="loginemail">Email:</label>
        <input type="text" id="loginemail" name="email"></input>
        <label htmlFor="loginsenha">Senha:</label>
        <input type="password" id="loginsenha" name="senha"></input>

        <button className="btnlogar">Entrar</button>
        <button className="btncancelarlogin">Cancelar</button>
      </div>
    </main>
  );
}

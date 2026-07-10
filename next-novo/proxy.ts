import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Pega o token (cookie) do usuário
  const token = request.cookies.get("session")?.value;

  // Lista com TODAS as pastas que estão dentro de (sistema_interno)
  const rotasPrivadas = [
    "/principal",
    "/criarcard",
    "/editarcard",
    "/editarperfil",
    "/verperfil",
    "/feedback",
  ];

  // Verifica se a URL atual começa com alguma das rotas privadas
  const tentandoAcessarRotaPrivada = rotasPrivadas.some((rota) =>
    request.nextUrl.pathname.startsWith(rota),
  );

  // Se tentar acessar rota privada SEM o token, joga de volta pra tela inicial/login
  if (tentandoAcessarRotaPrivada && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configura o proxy para observar todas essas rotas e seus subcaminhos
export const config = {
  matcher: [
    "/principal/:path*",
    "/criarcard/:path*",
    "/editarcard/:path*",
    "/editarperfil/:path*",
    "/verperfil/:path*",
    "/feedback/:path*",
  ],
};

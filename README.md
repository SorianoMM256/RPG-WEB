# NPRandon

O **NPRandon** é uma plataforma web para administração de NPCs de RPG. Com ele os usuários podem criar fichas simplicaficadas de Dnd e acompahar elas por cars. A aplicação utiliza a API externa do D&D 5ª edição para busca de classes, raças e detalhamento de skills.

Este projeto foi desenvolvido como o Trabalho Final para a disciplina **XDES03 – Programação Web** da **Universidade Federal de Itajubá (UNIFEI)**, sob a orientação do Prof. Phyllipe de Souza Lima Francisco.

---

## Demonstração (Screenshots do Sistema)

### 1. Tela de Login e Cadastro de Usuário
*Interface para autenticação de usuários, contendo validações completas de campos vazios, formato de e-mail, e senha diferente da padrão utilizando a biblioteca Zod.*

![Tela de cadastro](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/criar.png)
![Tela de login](https://github.com/SorianoMM256/RPG-WEB/blob/5b428bddd2992a1e777a0da4e300f20b500e3904/login.jpg)

### 2. Páginas de Informações Básicas do pré-sistema

*A interface pré-login apresenta informações sobre o projeto além de dados sobre a equipe.

![Home](https://github.com/SorianoMM256/RPG-WEB/blob/5b428bddd2992a1e777a0da4e300f20b500e3904/home.png )
![sobre](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/sobre.png)


### 3. Carrossel de Cards(Painel Principal)
*Exibição dos cards de usúario com seus atributos, nome, imagem e classe, caso não haja card mensagem padrão*

![padrao](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/principal.jpg)
![carrossel](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/carrosel.jpg)

### 4. Visualização do CARD
*Tela que mostra todas as informações do card.*

### 5. Edição do CARD
*Espaço para editar todas as informações desejadas.*

### 6. Perfil Visualizar
*Área dedicada para visualizar os dados do jogador e a contagem total de cards criados.*
![perfil](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/perfil.jpg)

### 7. Edicao Visualizar
*Área dedicada para editar os dados do jogador.*
![perfil](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/editar.jpg)

### 8. Feedback

*Área dedicada para feedbacks do usuário.*

![feedback](https://github.com/SorianoMM256/RPG-WEB/blob/7b90e250aa9b042fe42d9699bc58658b7e08a1d3/feedback.jpg)
---

## Tecnologias Utilizadas

- **Next.js**: Framework React com App Router.
- **TypeScript**: Tipagem estática para maior segurança e prevenção de erros.
- **Prisma ORM**: Modelagem e acesso ao banco de dados.
- **SQLite**: Banco de dados relacional leve e embutido.
- **Zod**: Validação estruturada de dados e formulários.
- **Bcrypt**: Criptografia e hashing seguro de senhas.
- **Jose**: Criação e verificação de JSON Web Tokens (JWT).
- **API Externa**: Integração com a D&D 5e API para dados de RPG.

---

## Como Executar o Projeto

Siga as instruções abaixo para preparar o ambiente e rodar a aplicação em sua máquina.

### Pré-requisitos
- Ter o **Node.js** instalado na máquina.
- Ter o **Git** instalado.

### Passo a Passo

1. **Clone o repositório e acesse a pasta do projeto:**
   git clone <link-do-seu-repositorio>
   cd NPRandon

2. **Instale as dependências:**
   npm install

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto e adicione as configurações de banco e segurança:
   
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="chave_secreta_rpg_unifei"

4. **Prepare o Banco de Dados (Prisma):**
   Gere o cliente do Prisma e sincronize a estrutura das tabelas com o arquivo SQLite:
   
   npx prisma generate
   npx prisma db push

5. **Inicie o Servidor de Desenvolvimento:**
   npm run dev

6. **Acesse no Navegador:**
   Abra http://localhost:3000 para visualizar a plataforma.

---

## Equipe

- **Maria Eduarda de Jesus Santana**
- **Matheus Motta Soriano**
- **Sofia Nogueira Batista**

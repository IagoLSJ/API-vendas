# API de Vendas

Este repositório contém o código fonte de uma API de vendas, desenvolvida com Node.js, TypeScript e Nest.js.

## Funcionalidades

A API de Vendas possui as seguintes funcionalidades:

- Cadastro de usuários;
- Autenticação de usuários;
- Cadastro de produtos;
- Listagem de produtos;
- Cadastro de vendas;
- Listagem de vendas.

## Requisitos

Para executar a API de Vendas, é necessário ter instalado em sua máquina o [Node.js](https://nodejs.org/) (versão 14 ou superior) e o [Docker](https://www.docker.com/).

## Como executar

Para executar a API de Vendas, siga os seguintes passos:

1. Clone este repositório:

```
git clone https://github.com/IagoLSJ/API-vendas.git
```

2. Instale as dependências:

```
npm install
```

3. Execute os containers do Docker:

```
docker-compose up -d
```

4. Execute as migrações do banco de dados:

```
npm run typeorm migration:run
```

5. Inicie a aplicação:

```
npm run start:dev
```

A aplicação estará disponível na porta 3000. Acesse a URL `http://localhost:3000` em seu navegador para testar as rotas da API.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

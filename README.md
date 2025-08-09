# API de Transferências

API Rest em Node.js e Express para login, registro, consulta de usuários e transferências, com banco de dados em memória.

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
npm install express swagger-ui-express
```

## Como rodar

- Para rodar o servidor:
  ```
npm start
```
  Ou:
  ```
node server.js
```

- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register` — Registro de usuário
- `POST /login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfer` — Transferência de valores

## Regras de negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Testes

A API foi estruturada para facilitar testes automatizados com Supertest, importando o `app.js` sem o método `listen()`.

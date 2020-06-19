import express from "express";
import mongoose from "mongoose";

import routes from "./routes";
// chamada do arquivos que contem as rotas do servidor

const app = express();

/**
 * conecta ao seu banco de dados
 * mongodb atalas disponibiliza um cluster gratuito para criar seu banco para testes 600 M de espaço
 * o { use... } de configurções é para não disparar erros de URL no termnal
 */
mongoose.connect(
  "mongodb+srv://ryannqwe:19735@ryanncluster-jntrn.mongodb.net/nomedobanco?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// para o servidor endender que o retorno será um JSON
app.use(express.json());
// para ultilizar as rotas que foram feitas no arquivo routes.ts
app.use(routes);

// inicia servidor local na posta 4001 (http://localhost:4001)
app.listen(4001);

// { Router } é uma desestruturação de import express from "express"
import { Router } from "express";

import SessionController from "./controllers/SessionController";

const routes = Router();

// 1 parametro a rota que o servidor vai acessar http://localhost:4001/{rota} "/" é a rota inicial
// 2 parametro uma função que diz o que vai acontecer quando o usuario acessar a rota

routes.get("/", SessionController.index);
// rota para rolgin
routes.get("/session/login", SessionController.show);

// rota para criar um usuario
routes.post("/session/singup", SessionController.storage);

routes.delete("/session/del-user", SessionController.delete);

// export default para que seja retornado o routes por padrão quando esse arquivo for chamado
export default routes;

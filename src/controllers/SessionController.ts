// iports para informar o tipo de parametro que cada dunção ira receber
import { Request, Response } from "express";

// modelo de usuarios para fazer pesquisas,criar, etc...
import User from "../models/User";

export default {
  // index: retorna todos os usuarios que tem cadastrado no banco
  async index(req: Request, res: Response) {
    // função find para procurar por doumentos salvos no caso Users salvos
    // .find({ name: "Alguem" }) por exemplo ele procuaria todos os que tem o nome de "Alguem"
    // .find() ira retornar todos os que existem em um [] array
    const users = await User.find();

    // retorna os usuarios
    return res.json(users);
  },
  // show: para mostrar apenas uma instância no caso apenas 1 usuario
  async show(req: Request, res: Response) {
    // req.query são parametros enviados pela URL http://localhost:4001?{email="..."&password="..."}
    const { email, password } = req.query;

    // procura por apenas um unico documento no banco de dados com  as informações passadas
    const user = await User.findOne({ email, password });

    // verificação se o usuario existe, caso não retorna erro e fala que não tem usuario com os dados informados
    if (!user) {
      // status: 400 é bad request que é um erro provavel que o client tenha digitado algo errado
      return res.status(400).json({ error: "User do not exist" });
    }
    // retorna o usuario
    return res.json(user);
  },
  // storage: cria uma instancia, no caso um documento no banco que é um usuario
  async storage(req: Request, res: Response) {
    const { email, name, password } = req.body;
    // req.body: é as informações que o usuario passa para o server por um json {"name":"Alguem","email":"..."...}
    let user = await User.findOne({ email, password });

    // antes de criar primeiro verifica se já existe
    if (user) {
      return res.status(400).json({ error: "Usuario já existe" });
    }
    // se não existir cria o usuario com as informações passadas
    user = await User.create({
      name,
      email,
      password,
    });

    // retorna o usuario criado
    return res.json(user);
  },

  // delete: deleta uma instancia, no caso um usuario
  async delete(req: Request, res: Response) {
    const { _id } = req.body;

    // findByIdAndDelete(id) procura um documento com esse id e o deleta em seguida
    const user = await User.findByIdAndDelete(_id);

    // user?.name verifica primeiro se existe um user para não retornar um undefined
    return res.json({ status: `user ${user?.name} deleted` });
  },
};

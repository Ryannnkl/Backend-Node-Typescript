import { Document, Schema, model } from "mongoose";

// interface para definir a tipagem do modelo do usuario
export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
}

// criação de um Schema de documento
const UserSchema: Schema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// retorna um modelo que vai ser nescessario para mecher com os documentos do banco
// procurar, criar e deletar usuario por exemplo
export default model<IUser>("User", UserSchema);

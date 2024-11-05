import { sql } from "../../db.js";

export class User {
  async register(data) {
    const { cpf, nome, email, telefone, deficiencia, nivel_suporte, senha } =
      data;

    const checkifUserExists = await this.getUserInfo(cpf);

    if (checkifUserExists.length === 1) {
      return { code: 200, message: "Já existe um usuário com este CPF!" };
    }
    try {
      await sql`INSERT INTO usuarios
         (cpf, nome, email, telefone, deficiencia, nivel_suporte, senha)
         VALUES 
        (${cpf},${nome},${email},${telefone},${deficiencia},${nivel_suporte},${senha})
            `;

      return {
        code: 201,
        message: "Usuário criado com sucesso!",
      };
    } catch (err) {
      console.error(err);
      return {
        code: err.code,
        message: err.detail,
      };
    }
  }

  async getUserInfo(cpf) {
    const response = await sql`select * from usuarios where cpf = ${cpf}`;

    return response;
  }
}

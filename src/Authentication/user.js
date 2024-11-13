import { sql } from "../../db.js";
import { randomUUID } from "node:crypto";
import { compareSync, hashSync } from "bcrypt";

export class User {
  async getUserInfo(cpf) {
    const response = await sql`select * from usuarios where cpf = ${cpf}`;

    return response;
  }

  async register(data) {
    const { cpf, nome, email, telefone, deficiencia, nivel_suporte, senha } =
      data;

    const checkifUserExists = await this.getUserInfo(cpf);

    if (checkifUserExists.length === 1) {
      if (checkifUserExists[0].email === email) {
        return {
          code: 200,
          message: "Este Email já está em uso, faça login para continuar",
        };
      }

      return {
        code: 200,
        message: "Este CPF já está em uso, faça login para continuar",
      };
    }

    const uuid = randomUUID();

    const encryptedPassword = hashSync(senha, 10);

    try {
      await sql`INSERT INTO usuarios
         (uuid,cpf, nome, email, telefone, deficiencia, nivel_suporte, senha)
         VALUES 
        (${uuid},${cpf},${nome},${email},${telefone},${deficiencia},${nivel_suporte},${encryptedPassword})
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

  async login(email, password) {
    const getUser =
      await sql`select email,senha from usuarios where email = ${email}`;

    if (getUser.length === 0) {
      return {
        code: 400,
        message: "Email incorreto!",
      };
    }

    const { senha } = getUser[0];

    const checkedPassword = compareSync(password, senha);

    if (!checkedPassword) {
      return {
        code: 400,
        message: "Senha incorreta!",
      };
    }

    return {
      code: 201,
      message: "Usuário autenticado!",
    };
  }
}

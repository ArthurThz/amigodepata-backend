import { randomUUID } from "node:crypto";
import { sql } from "../../db.js";

export class Appointments {
  async createAppointment(userId, animalId) {
    const uuid = randomUUID();

    const getUserInfo =
      await sql`select nome,cpf, deficiencia, nivel_suporte, telefone from usuarios where uuid = ${userId}`;

    const { nome, cpf, deficiencia, nivel_suporte, telefone } = getUserInfo[0];

    const getAnimalInfo =
      await sql` select nome from animais where codanimal = ${animalId}`;
    const nomeAnimal = getAnimalInfo[0].nome;

    const dataConsulta = new Date();
    const createNewAppointmentResponse = await sql`insert into consultas
     (id_consulta,nome_usuario,cpf_usuario,deficiencia,nivel_suporte,id_animal,data_consulta,horario,nome_animal,telefone)
    values
    (${uuid},${nome},${cpf},${deficiencia},${nivel_suporte},${animalId},${dataConsulta},'10:00',${nomeAnimal}, ${telefone}) `;

    return {
      code: 200,
      message: "TESTE",
      content: createNewAppointmentResponse,
    };
  }

  async deleteAppointment(appointmentId) {
    try {
      const response =
        await sql`delete from consultas where id_consulta = ${appointmentId}`;
      console.log(response);

      return {
        code: 200,
        message: "OK",
      };
    } catch (err) {
      return new Error(err);
    }
  }

  async getAppointments(userId) {
    try {
      const response =
        await sql`select * from consultas where cpf_usuario in (select cpf from usuarios where uuid = ${userId})`;

      if (response.length === 0) {
        return {
          code: 200,
          content: response,
          message: "Nenhuma consulta encontrada!",
        };
      }

      return {
        code: 200,
        content: response,
        message: "OK",
      };
    } catch (err) {
      console.log(err);
      return new Error(err);
    }
  }

  async getUserData(userId) {
    try {
      const response =
        await sql`select cpf, nome, deficiencia, nivel_suporte,telefone from usuarios where uuid = ${userId}`;

      return {
        code: 200,
        content: response,
      };
    } catch (err) {
      return new Error(err);
    }
  }
}

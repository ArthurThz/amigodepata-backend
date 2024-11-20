import { randomUUID } from "node:crypto";
import { sql } from "../../db.js";

export class Appointments {
  async createAppointment(userId,animalId) {
    const uuid = randomUUID();

    const getUserInfo = await sql`select nome,cpf, deficiencia, nivel_suporte from usuarios where uuid = ${userId}`

    const {nome, cpf,deficiencia,nivel_suporte } = getUserInfo[0]

    const getAnimalInfo = await sql` select nome from animais where codanimal = ${animalId}`
    const nomeAnimal = getAnimalInfo[0].nome

    const dataConsulta = new Date()
    const createNewAppointmentResponse = await sql`insert into consultas
     (id_consulta,nome_usuario,cpf_usuario,deficiencia,nivel_suporte,id_animal,data_consulta,horario,nome_animal)
    values
    (${uuid},${nome},${cpf},${deficiencia},${nivel_suporte},${animalId},${dataConsulta},'14:00',${nomeAnimal}) `
  
    // console.log(createNewAppointmentResponse)
     return {
      code:200,
      message:"TESTE",
      content:createNewAppointmentResponse
     }
  }

  async getAppointments(userId){
    try{
      const response = await sql`select * from consultas where cpf_usuario in (select cpf from usuarios where uuid = ${userId})`

      if(response.length === 0){
        return {
          code:200,
          content: response,
          message:"Nenhuma consulta encontrada!",
          
        }
      }
  
      return {
        code:200,
        content:response,
        message:"OK"
      }
    }    catch(err){
      console.log(err)
      return new Error(err)
    }

}

}

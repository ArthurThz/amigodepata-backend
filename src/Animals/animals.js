import { sql } from "../../db.js";

let status = {};
export class Animals {
  async getHorses() {
    try {
      const animals =
        await sql` select * from animais where tipoanimal = 'cavalo'`;

      if (animals.length === 0) {
        status = {
          code: 200,
          content: animals,
          message: "Nenhum animal encontrado!",
        };
        return status;
      }

      status = {
        code: 200,
        content: animals,
        message: "OK",
      };

      return status;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async addNewAnimal({ data }) {
    const { nome, idade, raca, especialidade, tipoanimal, codanimal, imagem } =
      data;

    try {
      const response =
        await sql`insert into Animais (codanimal,nome,tipoanimal,raca,especialidade,idade,imagem)
        values
        (${codanimal},${nome},${tipoanimal},${raca},${especialidade},${idade},${imagem}) `;

      console.log(response);
    } catch (err) {
      return err.data;
    }
  }
}

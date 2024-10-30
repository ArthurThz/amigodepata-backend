import { sql } from "../../db.js";

export class Animals {
  getHorses() {
    const animals = sql` select * from animais`;

    return animals;
  }
}

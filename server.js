import { fastify } from "fastify";
import cors from "@fastify/cors";
import { Animals } from "./src/Animals/animals.js";
const server = fastify();

const animals = new Animals();
server.register(cors, {
  origin: "*",
});
server.listen({
  port: 3333,
});

server.get("/teste", async (request, reply) => {
  const teste = await animals.getHorses();
  console.log(teste);
});

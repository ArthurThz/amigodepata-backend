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

server.get("/Horses", async (request, reply) => {
  const response = await animals.getHorses();
  console.log(response);
  reply.code(200).send(response);
});
server.get("/SupportAnimals", async (request, reply) => {
  const response = await animals.getSupportAnimals();
  reply.code(200).send(response);
});

server.post("/Horses", async (request, reply) => {
  const data = request.body;

  // console.log(data);
  const response = await animals.addNewAnimal({ data });

  return reply.code(200).send(response);
});

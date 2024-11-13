import { fastify } from "fastify";
import cors from "@fastify/cors";
import { Animals } from "./src/Animals/animals.js";
import { User } from "./src/Authentication/user.js";
const server = fastify();

const animals = new Animals();
const user = new User();
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

server.get("/Pets/:id", async (request, reply) => {
  const id = request.params.id;
  const response = await animals.getAnimalById(id);

  reply.code(200).send(response);
});

server.post("/Horses", async (request, reply) => {
  const data = request.body;

  // console.log(data);
  const response = await animals.addNewAnimal({ data });

  return reply.code(200).send(response);
});

server.post("/Register", async (request, reply) => {
  const userData = request.body;

  const response = await user.register(userData);
  const { code, message } = response;

  console.log(code, message);
  reply.code(code).send(message);
});

server.post("/Login", async (request, reply) => {
  const { email, senha } = request.body;

  const response = await user.login(email, senha);

  const { code, message } = response;

  reply.code(code).send(message);
});

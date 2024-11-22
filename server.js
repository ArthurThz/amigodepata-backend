import { fastify } from "fastify";
import cors from "@fastify/cors";
import { Animals } from "./src/Animals/animals.js";
import { User } from "./src/Authentication/user.js";
import { Appointments } from "./src/Appointments/appointments.js";
const server = fastify();

const animals = new Animals();
const user = new User();
const appointment = new Appointments()
server.register(cors, {
  origin: "*",
});
server.listen({
  port: 3333,
});

server.get("/Horses", async (request, reply) => {
  const response = await animals.getHorses();
  reply.code(200).send(response);
});
server.get("/SupportAnimals", async (request, reply) => {
  const response = await animals.getSupportAnimals();
  reply.code(200).send(response);
});

server.get("/Pets/:type/:id", async (request, reply) => {
  const id = request.params.id;
  const animalType = request.params.type;
  const response = await animals.getAnimalById(id, animalType);

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

  reply.code(code).send(message);
});

server.post("/Login", async (request, reply) => {
  const { email, senha } = request.body;

  const response = await user.login(email, senha);

  const { code, data } = response;

  reply.code(code).send(data);
});

server.post("/NewAppointment", async (request, reply) => {
  const { userId, animalId} = request.body;

  const response = await appointment.createAppointment(userId,animalId)
  console.log(response)
  const { code, message } = response;

  reply.code(code).send(message);
});

server.get("/MyAppointments/:id", async(request, reply) =>{
    const userId = request.params.id
  

    const getAppointmentsResponse = await appointment.getAppointments(userId)

    const {code } = getAppointmentsResponse
    reply.code(code).send(getAppointmentsResponse)

})

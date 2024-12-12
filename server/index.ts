import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { getServerConfig } from "./src/utils/serverConfig";
import { ServerConfig } from "./src/types/config";
import GameServer from "./src/class/GameServer";
import { users } from "./src/routes/users";

dotenv.config();

const server = fastify();

server.register(cors, {
  hook: "preHandler",
  delegator: (req, callback) => {
    const corsOptions = {
      origin: "*",
      allowedHeaders:
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    };
    callback(null, corsOptions);
  },
});

server.register(fastifyIO, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
server.register(users, { prefix: "/users" });

const serverConfig: ServerConfig = getServerConfig();
const gameServer = new GameServer(serverConfig);

server.ready().then(() => {
  gameServer.start(server.io);
});

server.listen({ port: 3001, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(84);
  }
});

import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import { getServerConfig } from "./src/utils/serverConfig";
import { ServerConfig } from "./src/type/config";
import cors from "@fastify/cors";
import GameServer from "./src/class/GameServer";

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

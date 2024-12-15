import { Server } from "socket.io";
import { PlayerCommands } from "../types/protocol";
import GameServer from "../class/GameServer";
import { MouseInfo } from "../types/protocol";
import { tokenVerify } from "../utils/token";
import { UserToken } from "../types/token";
import { getUser } from "../controllers/users";
import { User } from "../types/user";

export function setupEventsListener(io: Server, gameServer: GameServer) {
  io.on("connection", async (socket) => {
    const token = socket.handshake.headers.authorization;
    if (!token) {
      socket.disconnect();
      return;
    }

    const userToken: UserToken = tokenVerify(token);
    if (userToken.id === -1) {
      socket.disconnect();
      return;
    }

    const user: User | null = await getUser(userToken.id);
    if (user === null) {
      socket.disconnect();
      return;
    }

    if (gameServer.addPlayer(socket.id, user) === false) {
      socket.disconnect();
      return;
    }

    console.log("Connected : " + user.name);

    socket.emit("serverInfo", {
      tick: gameServer.tick,
      position: { x: 1200, y: 1200 },
      mapString: gameServer.mapString,
    });

    socket.on("disconnect", function () {
      console.log("Disconnected :" + socket.id);
      gameServer.removePlayer(socket.id);
      io.emit("playerDisconnect", socket.id);
    });

    socket.on("playerCommands", function (data: PlayerCommands) {
      gameServer.updateInput(
        socket.id,
        data.inputs || [false, false, false, false],
        data.updatedAt || new Date()
      );
    });

    socket.on("playerMouseInfo", function (data: MouseInfo) {
      gameServer.updateMouse(socket.id, data.position, data.buttons);
    });
  });
}

import { Server } from "socket.io";
import { PlayerCommands } from "../type/protocol";
import GameServer from "../class/GameServer";
import { MouseInfo } from "../type/protocol";

export function setupEventsListener(io: Server, gameServer: GameServer) {
  io.on("connection", (socket) => {
    console.log("Connected : " + socket.id);

    gameServer.addPlayer(socket.id);
    socket.emit("serverInfo", {
      tick: gameServer.tick,
      position: { x: 10 * 128 + 64, y: 10 * 128 + 64 },
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

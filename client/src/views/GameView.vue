<script lang="ts">
import { API_URL } from "@/config";
import Game from "@/game/Game";
import type { Vector2D } from "@/game/types/config";
import type { OnlinePlayer, ServerInfo } from "@/game/types/protocol";
import io, { Socket } from "socket.io-client";

export default {
  name: "GameView",
  components: {},
  methods: {
    loadGame() {
      const token = localStorage.getItem("token");
      if (token === null) {
        this.$router.push("/login");
        return;
      }

      const cvn: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
      cvn.width = window.innerWidth;
      cvn.height = window.innerHeight;

      const ctx: CanvasRenderingContext2D | null = cvn.getContext("2d");
      if (ctx !== null) {
        const socket: Socket = io(API_URL, {
          extraHeaders: {
            Authorization: token,
          },
        });

        launchGame(cvn, { x: cvn.width, y: cvn.height }, socket);
      }
    },
  },
  mounted() {
    this.loadGame();
  },
};

function launchGame(
  canvas: HTMLCanvasElement,
  windowSize: Vector2D,
  socket: Socket,
) {
  const world = new Game({
    canvas: canvas,
    socket: socket,
    windowSize: windowSize,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket.on("players", function (players: any) {
    const playerMap = new Map<string, OnlinePlayer>(players);
    world.updateOnlinePlayersMap(playerMap);
  });

  socket.on("playerDisconnect", function (socketId: string) {
    world.removeOnlinePlayer(socketId);
  });

  socket.on("serverInfo", function (serverInfo: ServerInfo) {
    console.log("Server:", serverInfo);
    world.updateServerInfo(serverInfo);

    world.start();
  });
}
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
  image-rendering: pixelated;
}
</style>

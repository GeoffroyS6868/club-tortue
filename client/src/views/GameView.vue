<script lang="ts">
import Game from "@/game/Game";
import type { GameConfig } from "@/game/types/config";

export default {
  name: "GameView",
  components: {},
  methods: {
    loadGame() {
      const cvn: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
      cvn.width = window.innerWidth;
      cvn.height = window.innerHeight;
      const ctx: CanvasRenderingContext2D | null = cvn.getContext("2d");
      if (ctx !== null) {
        const game = new Game({
          canvas: cvn,
          windowSize: { x: cvn.width, y: cvn.height },
        } as GameConfig);
        game.start();
      }
    },
  },
  mounted() {
    this.loadGame();
  },
};
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style>
canvas {
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
  image-rendering: pixelated;
}
</style>

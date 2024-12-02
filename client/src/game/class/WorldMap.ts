import type { WorldMapConfig, Vector2D } from "../types/config";

export default class WorldMap {
  image: HTMLImageElement;
  size: Vector2D;
  position: Vector2D;

  constructor(config: WorldMapConfig) {
    this.image = new Image();
    this.image.src = config.lowerSrc;

    this.position = { x: 0, y: 0 };

    this.size = config.mapSize;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    windowSize: Vector2D,
  ) {
    this.position.x = windowSize.x / 2 - cameraPosition.x;
    this.position.y = windowSize.y / 2 - cameraPosition.y;

    if (cameraPosition.x < windowSize.x / 2) {
      this.position.x = 0;
    }
    if (cameraPosition.y < windowSize.y / 2) {
      this.position.y = 0;
    }
    if (cameraPosition.x > this.size.x - windowSize.x / 2) {
      this.position.x = -this.size.x + windowSize.x;
    }
    if (cameraPosition.y > this.size.y - windowSize.y / 2) {
      this.position.y = -this.size.y + windowSize.y;
    }
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, windowSize.x, windowSize.y);
    //ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

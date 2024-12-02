import { Vector2D } from "./configs";

export declare interface Wall {
  position: Vector2D;
}

export declare interface WorldMap {
  mapSize: Vector2D;
  lowerSrc: string;
  upperSrc: string;
}

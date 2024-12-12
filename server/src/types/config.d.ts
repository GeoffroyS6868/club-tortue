import { IWorldMap } from "./worldMap";

export declare interface Attributes {
  speed: number;
}

export declare interface Vector2D {
  x: number;
  y: number;
}

export declare interface Inputs {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  shoot: boolean;
}

export declare interface GameObjectConfig {
  position: Vector2D;
}

export declare interface PlayerConfig extends GameObjectConfig {
  name: string;
  id: number;
  socketId: string;
  mousePosition: Vector2D;
  direction: Direction;
  inputs: boolean[];
  attributes: Attributes;
}

export declare interface ServerConfig {
  tick?: number;
  ratio?: number;
  pixelPerTile?: number;
}

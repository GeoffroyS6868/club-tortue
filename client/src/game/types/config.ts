import { ANIMATION } from "../enum/animation.e";
import { ENTITY } from "../enum/entity.e";

export declare interface Attributes {
  speed: number;
  defense: number;
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

export declare interface SpriteConfig {
  src: string;
  animations?: number[][][];
  currenAnimation?: ANIMATION;
  animationFrameLimit?: number;
  ratio?: number;
}

export declare interface GameObjectConfig {
  position: Vector2D;
  spriteConfig?: SpriteConfig;
  rigidBodyConfig?: RigidBodyConfig;
  entityType: ENTITY;
}

export declare interface PlayerConfig extends GameObjectConfig {
  socketId: string;
  serverPosition: Vector2D;
}

export declare interface GameConfig {
  canvas: HTMLCanvasElement;
  windowSize: Vector2D;
  // socket: Socket;
}

export declare interface WorldMapConfig {
  lowerSrc: string;
  upperSrc: string;
  mapSize: Vector2D;
}

export declare interface RigidBodyConfig {
  padding: number[];
}

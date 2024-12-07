import { Vector2D } from "./configs";

export declare interface ServerInfo {
  tick: number;
}

export declare interface PlayerCommands {
  inputs?: boolean[];
  updatedAt?: Date;
}

export declare interface MouseInfo {
  position: Vector2D;
  buttons: boolean[];
}

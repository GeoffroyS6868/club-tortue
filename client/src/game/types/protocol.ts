import type { Inputs, Vector2D } from "./config";

export declare interface OnlinePlayer {
  _position: Vector2D;
  _inputs: Inputs;
  _mousePosition: Vector2D;
}

export declare interface ServerInfo {
  tick: number;
  position: Vector2D;
}

export declare interface PlayerCommands {
  inputs?: boolean[];
  updatedAt?: Date;
}

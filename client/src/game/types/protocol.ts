import type { Vector2D } from "./config";

export declare interface OnlinePlayer {
  _name: string;
  _position: Vector2D;
  _inputs: boolean[];
  _mousePosition: Vector2D;
}

export declare interface ServerInfo {
  mapString: string;
  tick: number;
  position: Vector2D;
}

export declare interface PlayerCommands {
  inputs?: boolean[];
  updatedAt?: Date;
}

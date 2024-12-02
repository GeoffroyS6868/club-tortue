import type { Vector2D } from "./config";

export declare interface MouseInfo {
  position: Vector2D;
  buttons: boolean[];
}

export declare interface State {
  movements: number[];
  mouseInfo: MouseInfo;
}

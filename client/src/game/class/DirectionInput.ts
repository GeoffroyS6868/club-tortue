import { Socket } from "socket.io-client";
import { DIRECTION } from "../enum/direction.e";
import type { PlayerCommands } from "../types/protocol";

export default class DirectionInput {
  _keyMap: Map<string, DIRECTION>;
  _directionUpdate: number[][];
  _movements: number[];
  _userCommands: boolean[];

  constructor() {
    this._keyMap = new Map<string, DIRECTION>();
    this._keyMap.set("KeyS", DIRECTION.DOWN);
    this._keyMap.set("KeyW", DIRECTION.UP);
    this._keyMap.set("KeyA", DIRECTION.LEFT);
    this._keyMap.set("KeyD", DIRECTION.RIGHT);

    this._directionUpdate = [
      [0, -1], // Left
      [0, 1], // Right
      [1, 1], // Down
      [1, -1], // Up
    ];

    this._movements = [0, 0];

    this._userCommands = [false, false, false, false];
  }

  get movements() {
    return this._movements;
  }

  init(socket: Socket) {
    document.addEventListener("keydown", (e) => {
      const dir: DIRECTION | undefined = this._keyMap.get(e.code);
      if (dir !== undefined && this._userCommands[dir] === false) {
        this._userCommands[dir] = true;
        socket.emit("playerCommands", {
          inputs: this._userCommands,
          updatedAt: new Date(),
        } as PlayerCommands);
        const directionUpdate = this._directionUpdate[dir];
        this._movements[directionUpdate[0]] += directionUpdate[1];
      }
    });

    document.addEventListener("keyup", (e) => {
      const dir: DIRECTION | undefined = this._keyMap.get(e.code);
      if (dir !== undefined && this._userCommands[dir] === true) {
        this._userCommands[dir] = false;
        socket.emit("playerCommands", {
          inputs: this._userCommands,
          updatedAt: new Date(),
        } as PlayerCommands);
        const directionUpdate = this._directionUpdate[dir];
        this._movements[directionUpdate[0]] -= directionUpdate[1];
      }
    });
  }
}

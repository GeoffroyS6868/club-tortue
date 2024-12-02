import { ACTION } from "./enum/animation.e";
import { DIRECTION } from "./enum/direction.e";
import type { PlayerConfig, Vector2D } from "./types/config";
import type { MouseInfo, State } from "./types/state";
import GameObject from "./class/GameObject";

export default class Player extends GameObject {
  private _moved: boolean;
  private _movements: number[];
  private _speed: number;
  private _lastMove: Date;
  private _socketId: string;
  private _serverTick: number;
  private _timeBetweenUpdate: number;
  private _serverPosition: Vector2D;
  private _mousePosition: Vector2D;

  constructor(config: PlayerConfig) {
    super(config);

    this._moved = false;
    this._movements = [0, 0];
    this._speed = 4;
    this._lastMove = new Date();
    this._socketId = config.socketId;
    this._serverTick = 0;
    this._timeBetweenUpdate = 0;
    this._serverPosition = config.serverPosition;
    this._mousePosition = { x: 0, y: 0 };
  }

  update(state: State) {
    this.handleMouseEvents(state.mouseInfo);

    if (state.movements && this._moved) {
      this._movements = state.movements;
      this._moved = false;
    }
    this.updateSprite();
    this.updatePosition();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMouseEvents(mouseInfo: MouseInfo) {}

  updatePosition() {
    const now: number = new Date().getTime();
    const lastMoveTime: number = this._lastMove.getTime();
    const timeDif: number = now - lastMoveTime;
    if (timeDif >= this._timeBetweenUpdate) {
      const nbOfMovements = Math.floor(timeDif / this._timeBetweenUpdate);
      //const serverPositionDiff = this.getServerPositionDiff();

      const position: Vector2D = this.position;
      position.x += this.analyseMovement(0) * this._speed * nbOfMovements;
      // + serverPositionDiff.x;
      position.y += this.analyseMovement(1) * this._speed * nbOfMovements;
      // + serverPositionDiff.y;
      this.position = position;

      this._moved = true;
      this._lastMove = new Date(now - (timeDif % this._timeBetweenUpdate));
    }
  }

  getServerPositionDiff(): Vector2D {
    return {
      x: this._serverPosition.x - this.position.x,
      y: this._serverPosition.y - this.position.y,
    };
  }

  analyseMovement(i: number): number {
    const totalMovement =
      Math.abs(this._movements[0]) + Math.abs(this._movements[1]);

    return totalMovement > 1
      ? this._movements[i] > 0
        ? 0.7071
        : -0.7071
      : this._movements[i];
  }

  updateSprite() {
    const totalMovement =
      Math.abs(this._movements[0]) + Math.abs(this._movements[1]);

    if (totalMovement > 0 && !this._moved) {
      this.setAnimation(ACTION.WALK);
      return;
    }
    if (totalMovement === 0) {
      this.setAnimation(ACTION.IDLE);
    }
  }

  updateOnline(inputs: boolean[], position: Vector2D, mousePosition: Vector2D) {
    this.position = position;
    this._mousePosition = mousePosition;

    this._movements[0] =
      -Number(inputs[DIRECTION.LEFT]) + Number(inputs[DIRECTION.RIGHT]);
    this._movements[1] =
      -Number(inputs[DIRECTION.UP]) + Number(inputs[DIRECTION.DOWN]);
  }

  set serverTick(tick: number) {
    this._serverTick = tick;
    this._timeBetweenUpdate = 1000 / tick;
  }

  get socketId() {
    return this._socketId;
  }

  set serverPosition(serverPosition: Vector2D) {
    this._serverPosition = serverPosition;
  }

  set serverMousePosition(serverMousePosition: Vector2D) {
    this._mousePosition = serverMousePosition;
  }
}

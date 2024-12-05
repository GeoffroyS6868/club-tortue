import { DIRECTION } from "../enum/Direction.e";
import { Attributes, PlayerConfig, Vector2D } from "../type/config";
import GameObject from "./GameObject";

class Player extends GameObject {
  _name: string;
  _socketId: string;
  _mousePosition: Vector2D;
  _mouseButtons: boolean[];
  _direction: DIRECTION;
  _inputs: boolean[];
  _lastUpdated: Date;
  _attributes: Attributes;

  constructor(config: PlayerConfig) {
    super({
      position: config.position,
    });
    this._name = config.name;
    this._socketId = config.socketId;
    this._mousePosition = config.mousePosition;
    this._mouseButtons = [false, false, false];
    this._direction = config.direction;
    this._inputs = [false, false, false, false];
    this._lastUpdated = new Date();
    this._attributes = config.attributes;
  }

  get socketId() {
    return this._socketId;
  }

  get movements(): Vector2D {
    let movements: Vector2D = { x: 0, y: 0 };

    if (this._inputs[DIRECTION.DOWN]) {
      movements.y += 1;
    }
    if (this._inputs[DIRECTION.UP]) {
      movements.y -= 1;
    }
    if (this._inputs[DIRECTION.RIGHT]) {
      movements.x += 1;
    }
    if (this._inputs[DIRECTION.LEFT]) {
      movements.x -= 1;
    }
    return movements;
  }

  get speed(): number {
    return this._attributes.speed;
  }

  setInputs(inputs: boolean[], updatedAt: Date) {
    if (updatedAt < this._lastUpdated) {
      return;
    }

    this._inputs = inputs;
  }

  setMouse(position: Vector2D, buttons: boolean[]) {
    this._mousePosition = position;
    this._mouseButtons = buttons;
  }
}

export default Player;

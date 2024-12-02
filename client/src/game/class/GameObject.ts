import type { GameObjectConfig, Vector2D } from "../types/config";
import RigidBody from "./RigidBody";
import Sprite from "./Sprite";
import { ACTION } from "../enum/animation.e";
import { ENTITY } from "../enum/entity.e";

export default class GameObject {
  private _position: Vector2D;
  private _entityType: ENTITY;
  private _sprite?: Sprite;
  private _rigidBody?: RigidBody;

  draw: (
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    windowSize: Vector2D,
    mapSize: Vector2D,
  ) => void;

  constructor(config: GameObjectConfig) {
    this._position = config.position;

    if (config.spriteConfig) {
      this._sprite = new Sprite(config.spriteConfig);
    }

    if (config.rigidBodyConfig) {
      this._rigidBody = new RigidBody(config.rigidBodyConfig);
    }

    this._entityType = config.entityType;
    if (this._entityType === ENTITY.PLAYER) {
      this.draw = this.drawPlayer;
    } else {
      this.draw = this.drawOther;
    }
  }

  setAnimation(action: ACTION) {
    this._sprite?.setAnimation(action);
  }

  drawPlayer(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    windowSize: Vector2D,
    mapSize: Vector2D,
  ) {
    this._sprite?.drawPlayer(
      ctx,
      this._position,
      this._position,
      windowSize,
      mapSize,
    );
  }

  drawOther(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    windowSize: Vector2D,
    mapSize: Vector2D,
  ) {
    this._sprite?.draw(
      ctx,
      cameraPosition,
      this._position,
      windowSize,
      mapSize,
    );
  }

  set position(position: Vector2D) {
    this._position = position;
  }

  get position(): Vector2D {
    return this._position;
  }
}

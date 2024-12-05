import { GameObjectConfig, Vector2D } from "../type/config";

class GameObject {
  _position: Vector2D;

  constructor(config: GameObjectConfig) {
    this._position = config.position;
  }

  get position() {
    return this._position;
  }

  set position(position: Vector2D) {
    this._position = position;
  }
}

export default GameObject;

import { Vector2D } from "../type/config";
import { IWorldMap } from "../type/worldMap";

export default class WorldMap {
  private _name: string;
  private _mapSize: Vector2D;
  private _ratio: number;
  private _pixelPerTile: number;

  constructor(config: IWorldMap) {
    this._name = config.name;
    this._mapSize = config.mapSize;
    this._ratio = config.ratio;
    this._pixelPerTile = config.pixelPerTile;
  }

  checkMovement(playerPosition: Vector2D, movements: Vector2D): Vector2D {
    if (playerPosition.x + movements.x <= this._ratio / 2) {
      movements.x = -playerPosition.x + this._ratio / 2;
    } else if (
      playerPosition.x + movements.x >=
      this._mapSize.x - this._ratio / 2
    ) {
      movements.x = this._mapSize.x - playerPosition.x - this._ratio / 2;
    }

    if (playerPosition.y + movements.y <= this._ratio / 2) {
      movements.y = -playerPosition.y + this._ratio / 2;
    } else if (
      playerPosition.y + movements.y >=
      this._mapSize.y - this._ratio / 2
    ) {
      movements.y = this._mapSize.y - playerPosition.y - this._ratio / 2;
    }

    return movements;
  }
}

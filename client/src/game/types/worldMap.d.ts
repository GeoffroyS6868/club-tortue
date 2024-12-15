import { Vector2D } from "./configs";

export declare interface Wall {
  position: Vector2D;
}

export declare interface WorldMap {
  mapSize: Vector2D;
  lowerSrc: string;
  upperSrc: string;
}

export interface ObjectCollision {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MapObject {
  src: string;
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  collisions: ObjectCollision[];
}

export interface MapTileset {
  name: string;
  tilewidth: number;
  tileheight: number;
  columns: number;
}

export interface MapLayer {
  name: string;
  type: MAP_LAYER_TYPE;
  data: number[];
}

export interface MapInfos {
  layers: MapLayer[];
  tiles: Map<number, MapObject>;
}

import { Vector2D } from "./configs";
import { MAP_LAYER_TYPE } from "../enum/WorldMap.e";

export declare interface IWorldMap {
  name: string;
  mapSize: Vector2D;
  ratio: number;
  pixelPerTile: number;
}

/*
  Read from files
*/

export interface MapTiledTileset {
  firstgid: number;
  source: string;
}

export interface MapTiledLayer {
  name: string;
  data: number[];
}

export interface MapTiled {
  height: number;
  width: number;
  tilewidth: number;
  tileheight: number;
  tilesets: MapTiledTileset[];
  layers: MapTiledLayer[];
}

/*
  Used on server
*/

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

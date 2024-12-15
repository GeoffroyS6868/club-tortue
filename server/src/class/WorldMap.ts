import { Vector2D } from "../types/config";
import * as fs from "fs";
import {
  MapInfos,
  MapLayer,
  MapObject,
  MapTiled,
  MapTileset,
} from "../types/worldMap";
import { MAP_LAYER_TYPE } from "../enum/WorldMap.e";
import { parseStringPromise } from "xml2js";

export default class WorldMap {
  private _src: string;
  private _position: Vector2D;
  private _mapSize: Vector2D;
  private _pixelPerTile: number;
  private _ratio: number;

  mapString: string;
  private _layers: MapLayer[];
  private _tiles: Map<number, MapObject>;

  constructor(x: number, y: number) {
    this._src = `./maps/${x}/${y}/`;
    this._position = { x: x, y: y };
    this._mapSize = { x: 50, y: 50 };
    this._pixelPerTile = 16;
    this._ratio = 4;

    this.mapString = "";
    this._layers = [];
    this._tiles = new Map<number, MapObject>();

    this.loadMap();
  }

  private stringifyMapInfos(mapInfos: MapInfos): string {
    return JSON.stringify({
      ...mapInfos,
      tiles: Array.from(mapInfos.tiles.entries()),
    });
  }

  private parseMapInfos(parsedData: any): MapInfos {
    return {
      layers: parsedData.layers,
      tiles: new Map<number, MapObject>(parsedData.tiles),
    };
  }

  /**
   * Procedurally generate a new map
   */
  private generateMap() {}

  /**
   * Create map.json. Use tiled.json if possible.
   */
  private async createMapFile() {
    if (!fs.existsSync(this._src + "tiled.json")) {
      this.generateMap();
    }

    const jsonData = fs.readFileSync(this._src + "tiled.json", "utf8");
    const mapTiled: MapTiled = JSON.parse(jsonData);

    const mapInfos: MapInfos = {
      layers: [],
      tiles: new Map<number, MapObject>(),
    };

    for (let i = 0; i < mapTiled.tilesets.length; i += 1) {
      const filepath: string = `./maps/tilesets/${mapTiled.tilesets[
        i
      ].source.replace("tsx", "xml")}`;
      const xmlData = fs.readFileSync(filepath, "utf8");
      const jsonData = await parseStringPromise(xmlData);

      const currentTileset: MapTileset = {
        name: mapTiled.tilesets[i].source.replace(".tsx", ""),
        tilewidth: parseInt(jsonData.tileset.$.tilewidth),
        tileheight: parseInt(jsonData.tileset.$.tileheight),
        columns: parseInt(jsonData.tileset.$.columns),
      };

      if (jsonData.tileset.tile !== undefined) {
        for (let j = 0; j < jsonData.tileset.tile.length; j += 1) {
          if (jsonData.tileset.tile[j].objectgroup !== undefined) {
            const currentObjectId = parseInt(jsonData.tileset.tile[j].$.id);
            const currentObject: MapObject = {
              id: currentObjectId,
              src: currentTileset.name,
              collisions: [],
              x:
                (currentObjectId % currentTileset.columns) *
                currentTileset.tilewidth,
              y:
                Math.floor(currentObjectId / currentTileset.columns) *
                currentTileset.tileheight,
              w: currentTileset.tilewidth,
              h: currentTileset.tileheight,
            };
            for (
              let k = 0;
              k < jsonData.tileset.tile[j].objectgroup.length;
              k += 1
            ) {
              for (
                let l = 0;
                l < jsonData.tileset.tile[j].objectgroup[k].object.length;
                l += 1
              ) {
                currentObject.collisions.push({
                  x: parseInt(
                    jsonData.tileset.tile[j].objectgroup[k].object[l].$.x
                  ),
                  y: parseInt(
                    jsonData.tileset.tile[j].objectgroup[k].object[l].$.y
                  ),
                  w: parseInt(
                    jsonData.tileset.tile[j].objectgroup[k].object[l].$.width
                  ),
                  h: parseInt(
                    jsonData.tileset.tile[j].objectgroup[k].object[l].$.height
                  ),
                });
              }
            }
            mapInfos.tiles.set(
              currentObjectId + mapTiled.tilesets[i].firstgid,
              currentObject
            );
          }
        }
      }
    }

    for (let i = 0; i < mapTiled.layers.length; i += 1) {
      const mapLayer: MapLayer = {
        name: mapTiled.layers[i].name,
        type: MAP_LAYER_TYPE.BACKGROUND,
        data: mapTiled.layers[i].data,
      };

      if (mapLayer.name !== "Grass" && mapLayer.name !== "Decorations") {
        mapLayer.type = MAP_LAYER_TYPE.OBJECTS;
      }

      mapInfos.layers.push(mapLayer);
    }

    const jsonString = this.stringifyMapInfos(mapInfos);
    fs.writeFileSync(this._src + "map.json", jsonString, "utf8");
  }

  /**
   * Load the map. Called in constructor.
   */
  private async loadMap() {
    const mapFilepath: string = this._src + "map.json";
    if (!fs.existsSync(mapFilepath)) {
      await this.createMapFile();
    }

    this.mapString = fs.readFileSync(mapFilepath, "utf8");
    const mapInfos: MapInfos = this.parseMapInfos(JSON.parse(this.mapString));
    this._layers = mapInfos.layers;
    this._tiles = mapInfos.tiles;
  }

  /*checkMovement(playerPosition: Vector2D, movements: Vector2D): Vector2D {
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
  }*/
}

import { MAP_LAYER_TYPE } from "../enum/world.e";
import type { WorldMapConfig, Vector2D } from "../types/config";
import type { MapLayer, MapObject } from "../types/worldMap";

export default class WorldMap {
  private _name: string;
  private _src: string;

  size: Vector2D;
  private _ratio: number;
  private _sizeRatio: Vector2D;
  private _position: Vector2D;

  private _image: HTMLImageElement;

  private _imagesMap: Map<string, HTMLImageElement>;
  private _layers: MapLayer[];
  private _drawableLayers: MapLayer[];
  private _tiles: Map<number, MapObject>;
  private _mapLoaded: boolean;

  constructor(config: WorldMapConfig) {
    this._name = config.name;
    this._src = config.src;

    this.size = config.mapSize;
    this._ratio = 4;
    this._sizeRatio = {
      x: this.size.x * this._ratio,
      y: this.size.y * this._ratio,
    };

    this._image = new Image();
    this._image.src = this._src + "Background.png";

    this._imagesMap = new Map<string, HTMLImageElement>();
    this._layers = [];
    this._drawableLayers = [];
    this._tiles = new Map<number, MapObject>();
    this._mapLoaded = false;

    this._position = { x: 0, y: 0 };
  }

  updateMap(mapString: string) {
    const parsedData = JSON.parse(mapString);
    this._layers = parsedData.layers;
    this._tiles = new Map<number, MapObject>(parsedData.tiles);
    for (let i = 0; i < this._layers.length; i += 1) {
      if (this._layers[i].type === MAP_LAYER_TYPE.BACKGROUND) {
        continue;
      }
      this._drawableLayers.push(this._layers[i]);
      for (let j = 0; j < this._layers[i].data.length; j += 1) {
        if (this._layers[i].data[j] === 0) {
          continue;
        }
        const o: MapObject | undefined = this._tiles.get(
          this._layers[i].data[j],
        );
        if (o && this._imagesMap.get(o.src) === undefined) {
          const newImage = new Image();
          newImage.src = this._src + o.src + ".png";
          newImage.onload = () => {
            this._imagesMap.set(o.src, newImage);
          };
        }
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    windowSize: Vector2D,
  ) {
    this._position.x = windowSize.x / 2 - cameraPosition.x;
    this._position.y = windowSize.y / 2 - cameraPosition.y;

    if (cameraPosition.x < windowSize.x / 2) {
      this._position.x = 0;
    }
    if (cameraPosition.y < windowSize.y / 2) {
      this._position.y = 0;
    }
    if (cameraPosition.x > this.size.x - windowSize.x / 2) {
      this._position.x = -this.size.x + windowSize.x;
    }
    if (cameraPosition.y > this.size.y - windowSize.y / 2) {
      this._position.y = -this.size.y + windowSize.y;
    }
    ctx.drawImage(
      this._image,
      0,
      0,
      this.size.x,
      this.size.y,
      this._position.x,
      this._position.y,
      this._sizeRatio.x,
      this._sizeRatio.y,
    );

    for (let i = 0; i < this._drawableLayers.length; i += 1) {
      for (let j = 0; j < this._drawableLayers[i].data.length; j += 1) {
        if (this._drawableLayers[i].data[j] === 0) {
          continue;
        }

        const o: MapObject | undefined = this._tiles.get(
          this._drawableLayers[i].data[j],
        );
        if (o) {
          const img = this._imagesMap.get(o.src);
          if (img) {
            const x = (j % 50) * 64;
            const y = Math.floor(j / 50) * 64;
            ctx.drawImage(
              img,
              o.x,
              o.y,
              o.w,
              o.h,
              this._position.x + x,
              this._position.y + y - 384, // 6 * 64 = 384
              o.w * 4,
              o.h * 4,
            );
          }
        }
      }
    }
  }
}

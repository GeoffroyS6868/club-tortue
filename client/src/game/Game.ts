// import { Socket } from "socket.io-client";

import DirectionInput from "./class/DirectionInput";
import MouseInput from "./class/MouseInput";
import WorldMap from "./class/WorldMap";
import { ENTITY } from "./enum/entity.e";
import Player from "./Player";
import type { GameConfig, Vector2D } from "./types/config";
import type { OnlinePlayer, ServerInfo } from "./types/protocol";
import type { MouseInfo } from "./types/state";
import { TurtleCity } from "./worlds/TurtleCity";

export default class Game {
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  // _socket: Socket;
  _mainPlayer: Player;
  _players: Map<string, Player>;
  _map: WorldMap;
  _directionInput: DirectionInput;
  _mouseInput: MouseInput;
  _windowSize: Vector2D;
  _serverTick: number;

  constructor(config: GameConfig) {
    this._canvas = config.canvas;
    this._ctx = this._canvas.getContext("2d")!;
    this._ctx.imageSmoothingEnabled = false;
    // this._socket = config.socket;
    this._map = new WorldMap(TurtleCity);
    this._mainPlayer = new Player({
      position: { x: 200, y: 200 },
      spriteConfig: { src: "/game/TortueSprite.png", ratio: 20 },
      entityType: ENTITY.PLAYER,
      socketId: "", // config.socket.id,
      serverPosition: { x: 0, y: 0 },
    });
    this._players = new Map<string, Player>();

    this._directionInput = new DirectionInput();
    this._directionInput.init();
    //this._directionInput.init(this._socket);

    this._mouseInput = new MouseInput();
    this._mouseInput.init(this._canvas);

    this._windowSize = {
      x: config.windowSize.x,
      y: config.windowSize.y,
    };

    this._serverTick = 128;
  }

  start() {
    // Temporaire
    this._mainPlayer.serverTick = 128;

    const step = () => {
      requestAnimationFrame(step);
      const mouseInfo: MouseInfo = this.mousePositionToWorldPosition(
        this._mouseInput.info,
      );

      // this._socket.emit("playerMouseInfo", mouseInfo);
      this._mainPlayer.update({
        movements: this._directionInput.movements,
        mouseInfo: mouseInfo,
      });
      this.draw();
    };
    step();
  }

  mousePositionToWorldPosition(mouseInfo: MouseInfo): MouseInfo {
    const newMouseInfo: MouseInfo = mouseInfo;
    let x: number = mouseInfo.position.x;
    let y: number = mouseInfo.position.y;

    if (
      this._mainPlayer.position.x >
      this._map.size.x - this._windowSize.x / 2
    ) {
      x = this._map.size.x - this._windowSize.x + newMouseInfo.position.x;
    } else if (this._mainPlayer.position.x >= this._windowSize.x / 2) {
      x =
        this._mainPlayer.position.x -
        this._windowSize.x / 2 +
        newMouseInfo.position.x;
    }

    if (
      this._mainPlayer.position.y >
      this._map.size.y - this._windowSize.y / 2
    ) {
      y = this._map.size.y - this._windowSize.y + newMouseInfo.position.y;
    } else if (this._mainPlayer.position.y >= this._windowSize.y / 2) {
      y =
        this._mainPlayer.position.y -
        this._windowSize.y / 2 +
        newMouseInfo.position.y;
    }

    newMouseInfo.position = {
      x: x,
      y: y,
    };
    return newMouseInfo;
  }

  draw() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._map.draw(this._ctx, this._mainPlayer.position, this._windowSize);

    // this.drawOtherPlayers();

    this._mainPlayer.draw(
      this._ctx,
      this._mainPlayer.position,
      this._windowSize,
      this._map.size,
    );
  }

  drawOtherPlayers() {
    for (const [, player] of this._players) {
      player.updateSprite();
      player.draw(
        this._ctx,
        this._mainPlayer.position,
        this._windowSize,
        this._map.size,
      );
    }
  }

  updateOnlinePlayersMap(players: Map<string, OnlinePlayer>) {
    for (const [key, value] of players) {
      /*if (key === this._socket.id) {
        this._mainPlayer.serverPosition = value._position;
        continue;
      }*/
      let player = this._players.get(key);
      if (!player) {
        player = new Player({
          socketId: key,
          position: value._position,
          spriteConfig: { src: "/game/TortueSprite.png", ratio: 80 },
          entityType: ENTITY.MULTIPLAYER,
          serverPosition: value._position,
        });
        player.serverMousePosition = value._mousePosition;
        this._players.set(key, player);
        continue;
      }
      // player.updateOnline(value._inputs, value._position, value._mousePosition);
      this._players.set(key, player);
    }
  }

  removeOnlinePlayer(socketId: string) {
    this._players.delete(socketId);
  }

  updateServerInfo(serverInfo: ServerInfo) {
    this._serverTick = serverInfo.tick;
    this._mainPlayer.serverTick = serverInfo.tick;
    this._mainPlayer.position = serverInfo.position;
  }
}

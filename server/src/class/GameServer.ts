import { Server } from "socket.io";
import { setupEventsListener } from "../network/events";
import { ServerConfig, Vector2D } from "../types/config";
import { ATTRIBUTES } from "../enum/Attributes.e";
import { DIRECTION } from "../enum/Direction.e";
import { WORLDMAP } from "../enum/WorldMap.e";
import Player from "./Player";
import WorldMap from "./WorldMap";
import worldMaps from "../ressources/worlds";
import { User } from "../types/user";

export default class GameServer {
  private _worldMap: WorldMap;
  private _players: Map<string, Player>;
  private _playersUser: Map<number, User>;
  private _tick: number;
  private _timeBetweenUpdate: number;
  private _lastUpdated: Date;
  private _ratio: number;
  private _pixelPerTile: number;
  private _playersConnecting: Map<string, Player[]>;

  constructor(config: ServerConfig) {
    this._players = new Map<string, Player>();
    this._playersUser = new Map<number, User>();
    this._playersConnecting = new Map<string, Player[]>();
    this._tick = config.tick || 128;
    this._timeBetweenUpdate = 1000 / this._tick;
    this._lastUpdated = new Date();

    this._worldMap = new WorldMap(worldMaps[WORLDMAP.TURTLECITY]);

    this._ratio = config.ratio || 4;
    this._pixelPerTile = config.pixelPerTile || 20;
  }

  addPlayer(socketId: string, user: User): boolean {
    if (this._playersUser.get(user.id)) {
      return false;
    }
    this._playersUser.set(user.id, user);

    this._players.set(
      socketId,
      new Player({
        name: user.name,
        id: user.id,
        socketId: socketId,
        position: {
          x: 3900,
          y: 3900,
        },
        mousePosition: { x: 0, y: 0 },
        direction: DIRECTION.LEFT,
        inputs: [false, false, false, false],
        attributes: { speed: ATTRIBUTES.SPEED },
      })
    );
    return true;
  }

  removePlayer(socketId: string) {
    const player: Player | undefined = this._players.get(socketId);
    if (player) {
      this._playersUser.delete(player.id);
    }
    this._players.delete(socketId);
  }

  updateInput(socketId: string, inputs: boolean[], updatedAt: Date) {
    const player = this._players.get(socketId);

    if (player === undefined) {
      return;
    }

    player.setInputs(inputs, updatedAt);

    this._players.set(socketId, player);
  }

  updateMouse(socketId: string, position: Vector2D, buttons: boolean[]) {
    const player = this._players.get(socketId);

    if (player === undefined) {
      return;
    }

    player.setMouse(position, buttons);

    this._players.set(socketId, player);
  }

  start(io: Server) {
    setupEventsListener(io, this);
    this._lastUpdated = new Date();

    setInterval(() => {
      this.loop(io);
    }, this._timeBetweenUpdate);

    console.log("Game server is running...");
  }

  loop(io: Server) {
    this.updatePlayers();
    io.emit("players", Array.from(this._players));
  }

  updatePlayers() {
    const now: number = new Date().getTime();
    const lastUpdatedTime: number = this._lastUpdated.getTime();
    const timeDif: number = now - lastUpdatedTime;

    if (timeDif >= this._timeBetweenUpdate) {
      const nbOfMovements = Math.floor(timeDif / this._timeBetweenUpdate);
      for (let [key, player] of this._players) {
        let movements = player.movements;
        if (movements.x != 0 && movements.y != 0) {
          movements.x *= 0.7071 * player.speed * nbOfMovements;
          movements.y *= 0.7071 * player.speed * nbOfMovements;
        } else {
          movements.x *= player.speed * nbOfMovements;
          movements.y *= player.speed * nbOfMovements;
        }
        let position = player.position;

        // movements = this._worldMap.checkMovement(position, movements);

        position.x += movements.x;
        position.y += movements.y;
        player.position = position;
        this._players.set(key, player);
      }
      this._lastUpdated = new Date(now - (timeDif % this._timeBetweenUpdate));
    }
  }

  get tick(): number {
    return this._tick;
  }
}

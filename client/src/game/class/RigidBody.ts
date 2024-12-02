import type { RigidBodyConfig } from "../types/config";

export default class RigidBody {
  ratio: number;
  padding: number[];

  constructor(config: RigidBodyConfig) {
    this.ratio = 128;
    this.padding = config.padding;
  }

  // check(entityPosition: Vector2D) {}
}

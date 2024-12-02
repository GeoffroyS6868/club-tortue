import type { Vector2D } from "../types/config";
import type { MouseInfo } from "../types/state";

export default class MouseInput {
  private _position: Vector2D;
  private _buttonPressed: boolean[];

  constructor() {
    this._position = {
      x: 0,
      y: 0,
    };

    this._buttonPressed = [false, false, false];
  }

  get position(): Vector2D {
    return this._position;
  }

  set position(position: Vector2D) {
    this._position = position;
  }

  get info(): MouseInfo {
    return {
      position: this._position,
      buttons: this._buttonPressed,
    };
  }

  updateButton(button: number, down: boolean) {
    if (button < 0 || button > 2) {
      return;
    }

    this._buttonPressed[button] = down;
  }

  init(canvas: HTMLCanvasElement) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;

    canvas.addEventListener("mousemove", function (e: MouseEvent) {
      const position: Vector2D = {
        x: e.clientX,
        y: e.clientY,
      };
      _self.position = position;
    });

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
      _self.updateButton(e.button, true);
    });

    canvas.addEventListener("mouseup", function (e: MouseEvent) {
      _self.updateButton(e.button, false);
    });
  }
}

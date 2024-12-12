import { ACTION, ANIMATION } from "../enum/animation.e";
import type { SpriteConfig, Vector2D } from "../types/config";

export default class Sprite {
  name?: string;
  private _nameWidth: number;
  private _nameWidthhalf: number;

  image: HTMLImageElement;
  isLoaded: boolean;

  animations: number[][][];
  currentAnimation: ANIMATION;
  currentAnimationFrame: number;
  animationFrameLimit: number;
  animationFrameProgress: number;
  animationsArray: ANIMATION[];
  ratio: number;
  private _ratioUsed: number;
  private _ratioHalf: number;

  constructor(config: SpriteConfig) {
    this.isLoaded = false;
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.name = config.name;
    this._nameWidth = 0;
    this._nameWidthhalf = 0;
    if (this.name) {
      this._nameWidth = config.ctx.measureText(this.name).width;
      this._nameWidthhalf = this._nameWidth / 2;
    }

    this.animations = config.animations || [
      [[0, 0]],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
    ];
    this.currentAnimation = config.currenAnimation || ANIMATION.IDLE;
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 20;
    this.animationFrameProgress = this.animationFrameLimit;

    this.animationsArray = [ANIMATION.IDLE, ANIMATION.WALK];

    this.ratio = config.ratio || 20;
    this._ratioUsed = this.ratio * 4;
    this._ratioHalf = this._ratioUsed / 2;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  getAnimationNameFromKeys(action: ACTION) {
    return this.animationsArray[action];
  }

  setAnimation(action: ACTION) {
    const key = this.getAnimationNameFromKeys(action);

    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  drawPlayer(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    entity: Vector2D,
    windowSize: Vector2D,
    mapSize: Vector2D,
  ) {
    let x = entity.x - this._ratioHalf + windowSize.x / 2 - cameraPosition.x;
    let y = entity.y - this._ratioHalf + windowSize.y / 2 - cameraPosition.y;

    if (entity.x < windowSize.x / 2) {
      x = entity.x - this._ratioHalf;
    } else if (entity.x > mapSize.x - windowSize.x / 2) {
      x = -mapSize.x + windowSize.x + entity.x - this._ratioHalf;
    }

    if (entity.y < windowSize.y / 2) {
      y = entity.y - this._ratioHalf;
    } else if (entity.y > mapSize.y - windowSize.y / 2) {
      y = -mapSize.y + windowSize.y + entity.y - this._ratioHalf;
    }

    const [frameX, frameY] = this.frame;

    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        frameX * this.ratio,
        frameY * this.ratio,
        this.ratio,
        this.ratio,
        x,
        y,
        80,
        80,
      );
    }

    this.updateAnimationProgress();
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cameraPosition: Vector2D,
    entity: Vector2D,
    windowSize: Vector2D,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mapSize: Vector2D,
  ) {
    let x = entity.x - this._ratioHalf + windowSize.x / 2 - cameraPosition.x;
    let y = entity.y - this._ratioHalf + windowSize.y / 2 - cameraPosition.y;

    if (cameraPosition.x < windowSize.x / 2) x = entity.x - this._ratioHalf;
    if (cameraPosition.y < windowSize.y / 2) y = entity.y - this._ratioHalf;

    const [frameX, frameY] = this.frame;

    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        frameX * this.ratio,
        frameY * this.ratio,
        this.ratio,
        this.ratio,
        x,
        y,
        80,
        80,
      );
    }

    if (this.name) {
      ctx.fillText(this.name, x + this._ratioHalf - this._nameWidthhalf, y);
    }

    this.updateAnimationProgress();
  }
}

import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ITickable } from "../../shared/i-tickable";
import { IConfigurable } from "../../shared/i-configurable";

export interface ThreeDRendererControlsOptions {
  resetKey: string;
  minDistance: number;
  maxDistance: number;
  zoomSpeed: number;
  rotateSpeed: number;
  rangeFactor: number;
}

export const DEFAULT_CONTROLS_OPTIONS: ThreeDRendererControlsOptions = {
  resetKey: "Escape",
  minDistance: 0.01,
  maxDistance: Infinity,
  zoomSpeed: 0.3,
  rotateSpeed: 0.3,
  rangeFactor: 2,
};

export class ThreeDRendererControls
  extends OrbitControls
  implements ITickable, IConfigurable<ThreeDRendererControlsOptions>
{
  //
  private _resetKey: string;

  constructor(
    camera: PerspectiveCamera,
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererControlsOptions>
  ) {
    super(camera, domContainer);
    const options = {
      ...DEFAULT_CONTROLS_OPTIONS,
      ...initOptions,
    };
    this._resetKey = options.resetKey;
    this.minDistance = camera.near * options.rangeFactor;
    this.maxDistance = camera.far / options.rangeFactor;
    this.zoomSpeed = options.zoomSpeed;
    this.rotateSpeed = options.rotateSpeed;
    // this._controls.enableDamping = true;
    this.addEventListener("change", () => {
      this.handleChange();
    });
    domContainer.ownerDocument.addEventListener(
      "keydown",
      (event: KeyboardEvent) => this.handleKeyDown(event)
    );
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererControlsOptions>
  ): void {
    if (options.resetKey !== undefined) {
      this._resetKey = options.resetKey;
    }
  }

  public handleChange(): void {
    // can be called from ouside for specific behavior
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === this._resetKey) {
      this.reset();
    }
  }

  public tick(_delta: number): void {
    this.update();
  }

  public get distanceToTarget(): number {
    return this.target.distanceTo(this.object.position);
  }
}

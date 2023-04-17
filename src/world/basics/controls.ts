import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ITickable } from "../../shared/i-tickable";
import { IConfigurable } from "../../shared/i-configurable";

export interface ThreeDRendererControlsOptions {
  resetKey: string;
}

export const DEFAULT_CONTROLS_OPTIONS: ThreeDRendererControlsOptions = {
  resetKey: "Escape",
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
    // this._controls.enableDamping = true;
    this.addEventListener("change", () => this.handleChange());
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
}

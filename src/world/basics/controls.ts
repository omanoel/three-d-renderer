import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import { ITickable } from '../../shared/interfaces/i-tickable';
import { GetOptionValueUtil } from '../../shared/utils/get-option-value-util';
import {
  DEFAULT_CONTROLS_OPTIONS,
  ThreeDRendererControlsOptions,
} from './controls-options';

export class ThreeDRendererControls
  extends OrbitControls
  implements ITickable, IConfigurable<ThreeDRendererControlsOptions>
{
  //
  private _resetKey: string;
  public tickable: true;

  constructor(
    camera: PerspectiveCamera,
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererControlsOptions>
  ) {
    super(camera, domContainer);
    this.tickable = true;
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
    this.addEventListener('change', () => {
      this.handleChange();
    });
    domContainer.ownerDocument.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this.handleKeyDown(event)
    );
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererControlsOptions>
  ): void {
    this._resetKey = GetOptionValueUtil.getIfDefined(
      this._resetKey,
      options.resetKey
    );
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

  public setTarget(position: Vector3): void {
    this.target.set(position.x, position.y, position.z);
  }
}

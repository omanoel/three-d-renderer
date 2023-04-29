import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IConfigurable } from '../../shared/interfaces';
import { GetOptionValueUtil } from '../../shared/utils/get-option-value-util';
import {
  DEFAULT_CONTROLS_OPTIONS,
  ThreeDRendererControlsOptions
} from './controls-options';

export class ThreeDRendererControls
  extends OrbitControls
  implements IConfigurable<ThreeDRendererControlsOptions>
{
  //
  private _resetKey: string;
  private _boundingChangeEvent: () => void;
  private _boundingKeydownEvent: (event: KeyboardEvent) => void;

  constructor(
    camera: PerspectiveCamera,
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererControlsOptions>
  ) {
    super(camera, domContainer);
    const options = {
      ...DEFAULT_CONTROLS_OPTIONS,
      ...initOptions
    };
    this._resetKey = options.resetKey;
    this.minDistance = camera.near * options.rangeFactor;
    this.maxDistance = camera.far / options.rangeFactor;
    this.zoomSpeed = options.zoomSpeed;
    this.rotateSpeed = options.rotateSpeed;
    this._boundingChangeEvent = () => {
      this.handleChange();
    };
    this._boundingKeydownEvent = (event: KeyboardEvent) =>
      this.handleKeyDown(event);
    // this._controls.enableDamping = true;
    this.addEventListener('change', this._boundingChangeEvent);
    domContainer.ownerDocument.addEventListener(
      'keydown',
      this._boundingKeydownEvent
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
      this.resetView();
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

  public resetView(): void {
    this.reset();
    this.dispatchEvent({
      type: 'change',
      target: this
    });
  }
}

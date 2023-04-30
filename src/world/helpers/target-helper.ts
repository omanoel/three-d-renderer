import {
  BufferGeometry,
  Color,
  EllipseCurve,
  Line,
  LineBasicMaterial,
  Vector3
} from 'three';
import {
  AbstractOnlyTickableGroup,
  IConfigurable,
  ITickParams,
  ITickable
} from '../../shared';
import { ThreeDRendererAxesHelper } from './axes-helper';
import { ThreeDRendererAxesHelperOptions } from './axes-helper-options';
import {
  DEFAULT_TARGET_HELPER_OPTIONS,
  ThreeDRendererTargetHelperOptions
} from './target-helper-options';

export class ThreeDRendererTargetHelper
  extends AbstractOnlyTickableGroup<ITickable>
  implements IConfigurable<ThreeDRendererTargetHelperOptions>
{
  //
  public type: string;
  //
  private _originalDistanceToTarget: number;
  private _circleLine: Line | undefined;
  private _axesHelper: ThreeDRendererAxesHelper | undefined;
  //
  constructor(
    distanceToTarget: number,
    initActions?: Partial<ITickable>,
    initOptions?: Partial<ThreeDRendererTargetHelperOptions>
  ) {
    //
    super(initActions);
    //
    this.type = 'ThreeDRendererTargetHelper';
    // Options
    this.userData.options = {
      ...DEFAULT_TARGET_HELPER_OPTIONS,
      ...initOptions
    };
    // Init
    this.type = 'ThreeDRendererTargetHelper';
    this._originalDistanceToTarget = distanceToTarget;
    // Build
    this._build();
    // override onTick
    this.userData.onTick = this.tick.bind(this);
  }
  public updateWithOptions(
    options: Partial<ThreeDRendererTargetHelperOptions>
  ): void {
    //
    if (options.autoScale !== undefined) {
      this.userData.options.autoScale = options.autoScale;
    }
  }
  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params.distance, params.targetPos, params.cameraPos);
  }

  private _build(): void {
    this.clear();
    this._buildCircle();
    // this._buildAxesHelper(options);
  }

  private _buildCircle(): void {
    const circleCurve = new EllipseCurve(
      0,
      0, // ax, aY
      this.userData.options.radius,
      this.userData.options.radius, // xRadius, yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    );
    const points = circleCurve.getPoints(50);
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
      color: new Color('white'),
      transparent: true,
      opacity: 0.5
    });
    this._circleLine = new Line(geometry, material);
    this.add(this._circleLine);
  }

  private _buildAxesHelper(): void {
    const axesHelperOptions: Partial<ThreeDRendererAxesHelperOptions> = {
      length: 1,
      autoScale: true,
      x: {
        color: this.userData.options.color,
        inverted: false,
        position: { x: 0, y: 0, z: 0 },
        visible: true
      },
      y: {
        color: this.userData.options.color,
        inverted: false,
        position: { x: 0, y: 0, z: 0 },
        visible: true
      },
      z: {
        color: this.userData.options.color,
        inverted: false,
        position: { x: 0, y: 0, z: 0 },
        visible: true
      }
    };
    const axesHelper = new ThreeDRendererAxesHelper(
      this._originalDistanceToTarget,
      {},
      axesHelperOptions
    );
    this.add(axesHelper);
  }

  private _update(
    distance: number,
    newTargetPos: Vector3,
    cameraPos: Vector3
  ): void {
    if (this.userData.options.autoScale === true) {
      this._resize(distance / this._originalDistanceToTarget);
    }
    this.position.set(newTargetPos.x, newTargetPos.y, newTargetPos.z);
    this._circleLine?.lookAt(cameraPos);
  }

  private _resize(ratio: number): void {
    this._circleLine?.scale.setScalar(ratio);
  }
}

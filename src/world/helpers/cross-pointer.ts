import { BufferGeometry, Color, Line, LineBasicMaterial, Vector3 } from 'three';
import { AbstractOnlyTickableGroup } from '../../shared/abstract-xxxxxable-group';
import {
  IConfigurable,
  IOnlyTickable,
  ITickParams
} from '../../shared/interfaces';
import {
  DEFAULT_CROSS_POINTER_OPTIONS,
  ThreeDRendererCrossPointerOptions
} from './cross-pointer-options';

export class ThreeDRendererCrossPointer
  extends AbstractOnlyTickableGroup<IOnlyTickable>
  implements IConfigurable<ThreeDRendererCrossPointerOptions>
{
  //
  public type: string;
  private _material: LineBasicMaterial;
  private _originalDistanceToTarget: number;
  private _lineLength: number;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    distanceToTarget: number,
    initActions?: Partial<IOnlyTickable>,
    initOptions?: Partial<ThreeDRendererCrossPointerOptions>
  ) {
    super(initActions);
    const options: ThreeDRendererCrossPointerOptions = {
      ...DEFAULT_CROSS_POINTER_OPTIONS,
      ...initOptions
    };
    this.type = 'ThreeDRendererCrossPointer';
    this._material = new LineBasicMaterial({
      color: options.color,
      linewidth: options.lineWidth
    });
    this.visible = false;
    this._originalDistanceToTarget = distanceToTarget;
    this._lineLength = options.lineLength;
    this._build(options);
    // override onTick
    this.userData.onTick = this.tick.bind(this);
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererCrossPointerOptions>
  ): void {
    if (options.color !== undefined) {
      this._material.color = new Color(options.color);
    }
    if (options.lineWidth !== undefined) {
      this._material.linewidth = options.lineWidth;
    }
  }
  public display(position: Vector3): void {
    this.visible = true;
    this.position.set(position.x, position.y, position.z);
  }
  public hide(): void {
    this.visible = false;
  }
  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params.distance);
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _build(options: Partial<ThreeDRendererCrossPointerOptions>): void {
    if (options.lineLength !== undefined) {
      this.clear();
      this.add(this._createCrossLine(options.lineLength, 0, 0, 0));
      this.add(this._createCrossLine(options.lineLength, 0, Math.PI / 2, 0));
      this.add(this._createCrossLine(options.lineLength, 0, 0, Math.PI / 2));
    }
  }
  private _createCrossLine(
    lineLength: number,
    xRotation: number,
    yRotation: number,
    zRotation: number
  ): Line {
    const linesData = [
      new Vector3(-lineLength, 0, 0),
      new Vector3(+lineLength, 0, 0)
    ];
    const geometry = new BufferGeometry().setFromPoints(linesData);
    const crossLine = new Line(geometry, this._material);
    crossLine.rotateX(xRotation);
    crossLine.rotateY(yRotation);
    crossLine.rotateZ(zRotation);
    return crossLine;
  }

  private _update(distance: number): void {
    this._resize(distance / this._originalDistanceToTarget);
  }
  //
  private _resize(ratio: number): void {
    this.scale.setScalar(ratio);
  }
}

import {
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  ThreeDRendererCrossPointerOptions,
  DEFAULT_CROSS_POINTER_OPTIONS,
} from "./cross-pointer-options";

export class ThreeDRendererCrossPointer
  extends Group
  implements IConfigurable<ThreeDRendererCrossPointerOptions>
{
  //
  public static NAME = "CROSS_POINTER";
  private _material: LineBasicMaterial;
  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(initOptions?: Partial<ThreeDRendererCrossPointerOptions>) {
    super();
    const options: ThreeDRendererCrossPointerOptions = {
      ...DEFAULT_CROSS_POINTER_OPTIONS,
      ...initOptions,
    };
    this._material = new LineBasicMaterial({
      color: options.color,
      linewidth: options.lineWidth,
    });
    this.visible = false;
    this.name = ThreeDRendererCrossPointer.NAME;
    this._build(options);
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

  // =======================================
  // PRIVATE
  // =======================================
  private _build(options: ThreeDRendererCrossPointerOptions): void {
    this.clear();
    this.add(this._createCrossLine(options.lineLength, 0, 0, 0));
    this.add(this._createCrossLine(options.lineLength, 0, Math.PI / 2, 0));
    this.add(this._createCrossLine(options.lineLength, 0, 0, Math.PI / 2));
  }
  private _createCrossLine(
    lineLength: number,
    xRotation: number,
    yRotation: number,
    zRotation: number
  ): Line {
    const linesData = [
      new Vector3(-lineLength, 0, 0),
      new Vector3(+lineLength, 0, 0),
    ];
    const geometry = new BufferGeometry().setFromPoints(linesData);
    const crossLine = new Line(geometry, this._material);
    crossLine.rotateX(xRotation);
    crossLine.rotateY(yRotation);
    crossLine.rotateZ(zRotation);
    return crossLine;
  }
}

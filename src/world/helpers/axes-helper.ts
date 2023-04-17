import { ArrowHelper, Color, ColorRepresentation, Group, Vector3 } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import { ThreeDRendererPositionOptions } from "../../shared/position-options";

export interface ThreeDRendererAxesHelperOptions {
  xAxis: ThreeDRendererAxisHelperOptions;
  yAxis: ThreeDRendererAxisHelperOptions;
  zAxis: ThreeDRendererAxisHelperOptions;
  origin: ThreeDRendererPositionOptions;
}

export interface ThreeDRendererAxisHelperOptions {
  length: number;
  headLength: number;
  headWidth: number;
  color: ColorRepresentation;
  inverted: boolean;
}

export const DEFAULT_AXES_HELPER_OPTIONS: ThreeDRendererAxesHelperOptions = {
  xAxis: {
    length: 5,
    color: "green",
    inverted: false,
    headLength: 1,
    headWidth: 1,
  },
  yAxis: {
    length: 5,
    color: "red",
    inverted: false,
    headLength: 1,
    headWidth: 1,
  },
  zAxis: {
    length: 5,
    color: "blue",
    inverted: true,
    headLength: 1,
    headWidth: 1,
  },
  origin: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export class ThreeDRendererAxesHelper
  extends Group
  implements IConfigurable<ThreeDRendererAxesHelperOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererAxesHelperOptions>) {
    super();
    const options: ThreeDRendererAxesHelperOptions = {
      ...DEFAULT_AXES_HELPER_OPTIONS,
      ...initOptions,
    };
    this._build(options);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererAxesHelperOptions>
  ): void {
    if (options.xAxis !== undefined) {
      const axisX = this.getObjectByName("axisX");
      if (axisX !== undefined) {
        //
      }
    }
  }

  private _build(options: ThreeDRendererAxesHelperOptions): void {
    this.clear();
    const origin = new Vector3(
      options.origin.x,
      options.origin.y,
      options.origin.z
    );
    const axisX = new ArrowHelper(
      new Vector3(options.xAxis.inverted ? -1 : 1, 0, 0),
      origin,
      options.xAxis.length,
      new Color(options.xAxis.color) /*,
      options.xAxis.headLength,
      options.xAxis.headWidth*/
    );
    axisX.name = "axisX";
    const axisY = new ArrowHelper(
      new Vector3(0, options.yAxis.inverted ? -1 : 1, 0),
      origin,
      options.yAxis.length,
      new Color(options.yAxis.color) /*,
      options.yAxis.headLength,
      options.yAxis.headWidth*/
    );
    axisY.name = "axisY";
    const axisZ = new ArrowHelper(
      new Vector3(0, 0, options.zAxis.inverted ? -1 : 1),
      origin,
      options.zAxis.length,
      new Color(options.zAxis.color) /*,
      options.zAxis.headLength,
      options.zAxis.headWidth*/
    );
    axisZ.name = "axisZ";
    this.add(axisX, axisY, axisZ);
  }
}

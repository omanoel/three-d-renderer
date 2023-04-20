import { ArrowHelper, Group, Object3D, Vector3 } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  ThreeDRendererAxesHelperOptions,
  DEFAULT_AXES_HELPER_OPTIONS,
} from "./axes-helper-options";
import { GetOptionValueUtil } from "../../shared/utils/get-option-value-util";
import { AxisTypes } from "../../shared/i-options";

export class ThreeDRendererAxesHelper
  extends Group
  implements IConfigurable<ThreeDRendererAxesHelperOptions>
{
  //
  public static readonly AXIS_ARROW_NAME = "axis-arrow-";
  //
  private _originalDistanceToTarget: number;
  private _options: ThreeDRendererAxesHelperOptions;
  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    distanceToTarget: number,
    initOptions?: Partial<ThreeDRendererAxesHelperOptions>
  ) {
    super();
    const options: ThreeDRendererAxesHelperOptions = {
      ...DEFAULT_AXES_HELPER_OPTIONS,
      ...initOptions,
    };
    this._originalDistanceToTarget = distanceToTarget;
    this._options = options;
    this._build(options);
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererAxesHelperOptions>
  ): void {
    if (options.x !== undefined) {
      const axisX = this.getObjectByName(
        ThreeDRendererAxesHelper.AXIS_ARROW_NAME + "x"
      );
      if (axisX !== undefined) {
        //
      }
    }
  }
  public resize(distance: number): void {
    const options: ThreeDRendererAxesHelperOptions = {
      ...this._options,
      length:
        (this._options.length * distance) / this._originalDistanceToTarget,
    };
    this._build(options);
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _build(options: ThreeDRendererAxesHelperOptions): void {
    this.clear();
    const axisArrowX = this._initAxisArrow("x");
    const axisArrowY = this._initAxisArrow("y");
    const axisArrowZ = this._initAxisArrow("z");
    this._updateAxisArrowWithOptions(axisArrowX, options, "x");
    this._updateAxisArrowWithOptions(axisArrowY, options, "y");
    this._updateAxisArrowWithOptions(axisArrowZ, options, "z");
    this.add(axisArrowX, axisArrowY, axisArrowZ);
  }

  private _initAxisArrow(
    axis: keyof Pick<ThreeDRendererAxesHelperOptions, AxisTypes>
  ): ArrowHelper {
    const arrowOptions = DEFAULT_AXES_HELPER_OPTIONS[axis];
    const arrow = new ArrowHelper(
      this._getAxisArrowDirection(axis, arrowOptions.inverted),
      new Vector3(
        arrowOptions.position.x,
        arrowOptions.position.y,
        arrowOptions.position.z
      ),
      this._options.length,
      arrowOptions.color
    );
    arrow.name = ThreeDRendererAxesHelper.AXIS_ARROW_NAME + axis;
    return arrow;
  }

  private _getAxisArrowDirection(
    axis: keyof Pick<ThreeDRendererAxesHelperOptions, AxisTypes>,
    inverted: boolean
  ): Vector3 {
    let direction: Vector3;
    switch (axis) {
      case "x": {
        direction = new Vector3(inverted ? -1 : 1, 0, 0);
        break;
      }
      case "y": {
        direction = new Vector3(0, inverted ? -1 : 1, 0);
        break;
      }
      case "z": {
        direction = new Vector3(0, 0, inverted ? -1 : 1);
        break;
      }
    }
    return direction;
  }

  private _updateAxisArrowWithOptions(
    axisArrow: Object3D,
    axisHelperOptions: Partial<ThreeDRendererAxesHelperOptions>,
    axisArrowOptionsAttributeName: keyof Pick<
      ThreeDRendererAxesHelperOptions,
      AxisTypes
    >
  ): void {
    const axisArrowOptions = axisHelperOptions[axisArrowOptionsAttributeName];

    axisArrow.visible = GetOptionValueUtil.getIfDefined(
      axisArrow.visible,
      axisHelperOptions.visible,
      axisArrowOptions?.visible
    );

    axisArrow.position.set(
      GetOptionValueUtil.getIfDefined(
        axisArrow.position.x,
        axisHelperOptions.position?.x,
        axisArrowOptions?.position?.x
      ),
      GetOptionValueUtil.getIfDefined(
        axisArrow.position.y,
        axisHelperOptions.position?.y,
        axisArrowOptions?.position?.y
      ),
      GetOptionValueUtil.getIfDefined(
        axisArrow.position.z,
        axisHelperOptions.position?.z,
        axisArrowOptions?.position?.z
      )
    );

    if (axisArrow instanceof ArrowHelper) {
      axisArrow.setDirection(
        this._getAxisArrowDirection(
          axisArrowOptionsAttributeName,
          GetOptionValueUtil.getIfDefined(false, axisArrowOptions?.inverted)
        )
      );

      if (axisHelperOptions?.length !== undefined) {
        axisArrow.setLength(axisHelperOptions.length);
      }

      if (axisArrowOptions?.color !== undefined) {
        axisArrow.setColor(axisArrowOptions.color);
      }
    }
  }
}

import { ArrowHelper, Object3D, Vector3 } from 'three';
import { AbstractOnlyTickableGroup } from '../../shared/abstract-xxxxxable-group';
import { SharedAxisTypes } from '../../shared/i-options';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import { GetOptionValueUtil } from '../../shared/utils/get-option-value-util';
import {
  DEFAULT_AXES_HELPER_OPTIONS,
  ThreeDRendererAxesHelperOptions,
} from './axes-helper-options';

export class ThreeDRendererAxesHelper
  extends AbstractOnlyTickableGroup
  implements IConfigurable<ThreeDRendererAxesHelperOptions>
{
  //
  public static readonly AXIS_ARROW_NAME = 'axis-arrow-';
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
        ThreeDRendererAxesHelper.AXIS_ARROW_NAME + 'x'
      );
      if (axisX !== undefined) {
        //
      }
    }
  }
  public tick(delta: number): void {
    // can be overriden in world
  }
  public resize(distance: number, targetPos: Vector3): void {
    this._update(distance / this._originalDistanceToTarget, targetPos);
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _build(options: ThreeDRendererAxesHelperOptions): void {
    this.clear();
    const axisArrowX = this._initAxisArrow('x');
    const axisArrowY = this._initAxisArrow('y');
    const axisArrowZ = this._initAxisArrow('z');
    this._updateAxisArrowWithOptions(axisArrowX, options, 'x');
    this._updateAxisArrowWithOptions(axisArrowY, options, 'y');
    this._updateAxisArrowWithOptions(axisArrowZ, options, 'z');
    this.add(axisArrowX, axisArrowY, axisArrowZ);
    this.position.set(
      options.position.x,
      options.position.y,
      options.position.z
    );
  }

  private _update(scale: number, position: Vector3): void {
    this.position.set(position.x, position.y, position.z);
    this.scale.set(scale, scale, scale);
  }

  private _initAxisArrow(
    axis: keyof Pick<ThreeDRendererAxesHelperOptions, SharedAxisTypes>
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
    axis: keyof Pick<ThreeDRendererAxesHelperOptions, SharedAxisTypes>,
    inverted: boolean
  ): Vector3 {
    let direction: Vector3;
    switch (axis) {
      case 'x': {
        direction = new Vector3(inverted ? -1 : 1, 0, 0);
        break;
      }
      case 'y': {
        direction = new Vector3(0, inverted ? -1 : 1, 0);
        break;
      }
      case 'z': {
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
      SharedAxisTypes
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

import { Group } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { ThreeDRendererPositionOptions } from '../../shared/i-options';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import { ThreeDRendererCamera } from '../basics/camera';
import { ThreeDRendererControls } from '../basics/controls';
import {
  DEFAULT_HELPERS_OPTIONS,
  ThreeDRendererHelpersOptions,
} from './_helpers-options';
import { ThreeDRendererAxesHelper } from './axes-helper';
import { ThreeDRendererCrossPointer } from './cross-pointer';
import { ThreeDRendererGridsHelper } from './grids-helper';

export class ThreeDRendererHelpers
  extends Group
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererGridsHelper: ThreeDRendererGridsHelper;
  private _threeDRendererAxesHelper: ThreeDRendererAxesHelper;
  private _threeDRendererCrossPointer: ThreeDRendererCrossPointer;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    threeDRendererCamera: ThreeDRendererCamera,
    threeDRendererControls: ThreeDRendererControls,
    font: Font,
    worldOrigin: ThreeDRendererPositionOptions,
    initOptions?: Partial<ThreeDRendererHelpersOptions>
  ) {
    super();
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions,
    };
    options.gridsHelper.worldOrigin = worldOrigin;
    this._threeDRendererGridsHelper = new ThreeDRendererGridsHelper(
      font,
      threeDRendererCamera.position,
      options.gridsHelper
    );
    this._threeDRendererAxesHelper = new ThreeDRendererAxesHelper(
      threeDRendererControls.distanceToTarget,
      options.axesHelper
    );
    this._threeDRendererCrossPointer = new ThreeDRendererCrossPointer(
      threeDRendererControls.distanceToTarget,
      options.crossPointer
    );
    this.add(
      this._threeDRendererGridsHelper,
      this._threeDRendererAxesHelper,
      this._threeDRendererCrossPointer
    );
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererHelpersOptions>
  ): void {
    if (options.gridsHelper !== undefined) {
      this._threeDRendererGridsHelper.updateWithOptions(options.gridsHelper);
    }
    if (options.axesHelper !== undefined) {
      this._threeDRendererAxesHelper.updateWithOptions(options.axesHelper);
    }
    if (options.crossPointer !== undefined) {
      this._threeDRendererCrossPointer.updateWithOptions(options.crossPointer);
    }
  }

  // =======================================
  // GETTER
  // =======================================
  public get threeDRendererGridsHelper(): ThreeDRendererGridsHelper {
    return this._threeDRendererGridsHelper;
  }
  public get threeDRendererAxesHelper(): ThreeDRendererAxesHelper {
    return this._threeDRendererAxesHelper;
  }
  public get threeDRendererCrossPointer(): ThreeDRendererCrossPointer {
    return this._threeDRendererCrossPointer;
  }
}

import { Group } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { SharedPositionOptions } from '../../shared/i-options';
import { IConfigurable } from '../../shared/interfaces';
import { ThreeDRendererCamera } from '../basics/camera';
import { ThreeDRendererControls } from '../basics/controls';
import {
  DEFAULT_HELPERS_OPTIONS,
  ThreeDRendererHelpersOptions
} from './_helpers-options';
import { ThreeDRendererAxesHelper } from './axes-helper';
import { ThreeDRendererCrossPointer } from './cross-pointer';
import { ThreeDRendererGridsHelper } from './grids-helper';

export class ThreeDRendererHelpers
  extends Group
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererAxesHelper: ThreeDRendererAxesHelper;
  private _threeDRendererCrossPointer: ThreeDRendererCrossPointer;
  private _threeDRendererGridsHelper: ThreeDRendererGridsHelper;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    threeDRendererCamera: ThreeDRendererCamera,
    threeDRendererControls: ThreeDRendererControls,
    font: Font,
    worldOrigin: SharedPositionOptions,
    initOptions?: Partial<ThreeDRendererHelpersOptions>
  ) {
    super();
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions
    };
    options.gridsHelper.gridOrigin = worldOrigin;
    this._threeDRendererAxesHelper = new ThreeDRendererAxesHelper(
      threeDRendererControls.distanceToTarget,
      threeDRendererControls.target,
      {},
      options.axesHelper
    );
    this._threeDRendererCrossPointer = new ThreeDRendererCrossPointer(
      threeDRendererControls.distanceToTarget,
      {},
      options.crossPointer
    );
    this._threeDRendererGridsHelper = new ThreeDRendererGridsHelper(
      font,
      threeDRendererControls.distanceToTarget,
      threeDRendererCamera.position,
      {},
      options.gridsHelper
    );
    this.add(
      this._threeDRendererAxesHelper,
      this._threeDRendererCrossPointer,
      this._threeDRendererGridsHelper
    );
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererHelpersOptions>
  ): void {
    if (options.axesHelper !== undefined) {
      this._threeDRendererAxesHelper.updateWithOptions(options.axesHelper);
    }
    if (options.crossPointer !== undefined) {
      this._threeDRendererCrossPointer.updateWithOptions(options.crossPointer);
    }
    if (options.gridsHelper !== undefined) {
      this._threeDRendererGridsHelper.updateWithOptions(options.gridsHelper);
    }
  }

  // =======================================
  // GETTER
  // =======================================
  public get threeDRendererAxesHelper(): ThreeDRendererAxesHelper {
    return this._threeDRendererAxesHelper;
  }
  public get threeDRendererCrossPointer(): ThreeDRendererCrossPointer {
    return this._threeDRendererCrossPointer;
  }
  public get threeDRendererGridsHelper(): ThreeDRendererGridsHelper {
    return this._threeDRendererGridsHelper;
  }
}

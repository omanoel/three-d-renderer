import { Font } from 'three/examples/jsm/loaders/FontLoader';
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
import { ThreeDRendererTargetHelper } from './target-helper';

export class ThreeDRendererHelpers
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererAxesHelper: ThreeDRendererAxesHelper;
  private _threeDRendererCrossPointer: ThreeDRendererCrossPointer;
  private _threeDRendererGridsHelper: ThreeDRendererGridsHelper;
  private _threeDRendererTargetHelper: ThreeDRendererTargetHelper;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    threeDRendererCamera: ThreeDRendererCamera,
    threeDRendererControls: ThreeDRendererControls,
    font: Font,
    initOptions?: Partial<ThreeDRendererHelpersOptions>
  ) {
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions
    };
    this._threeDRendererAxesHelper = new ThreeDRendererAxesHelper(
      threeDRendererControls.distanceToTarget,
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
    this._threeDRendererTargetHelper = new ThreeDRendererTargetHelper(
      threeDRendererControls.distanceToTarget,
      {},
      options.targetHelper
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
    if (options.targetHelper !== undefined) {
      this._threeDRendererTargetHelper.updateWithOptions(options.targetHelper);
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
  public get threeDRendererTargetHelper(): ThreeDRendererTargetHelper {
    return this._threeDRendererTargetHelper;
  }
}

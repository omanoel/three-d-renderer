import { Group } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  DEFAULT_GRIDS_HELPER_OPTIONS,
  ThreeDRendererGridsHelper,
  ThreeDRendererGridsHelperOptions,
} from "./grids-helper";
import {
  DEFAULT_AXES_HELPER_OPTIONS,
  ThreeDRendererAxesHelper,
  ThreeDRendererAxesHelperOptions,
} from "./axes-helper";

export interface ThreeDRendererHelpersOptions {
  gridsHelper: ThreeDRendererGridsHelperOptions;
  axesHelper: ThreeDRendererAxesHelperOptions;
}

export const DEFAULT_HELPERS_OPTIONS: ThreeDRendererHelpersOptions = {
  gridsHelper: DEFAULT_GRIDS_HELPER_OPTIONS,
  axesHelper: DEFAULT_AXES_HELPER_OPTIONS,
};

export class ThreeDRendererHelpers
  extends Group
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererGridsHelper: ThreeDRendererGridsHelper;
  private _threeDRendererAxesHelper: ThreeDRendererAxesHelper;

  constructor(initOptions?: Partial<ThreeDRendererHelpersOptions>) {
    super();
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererGridsHelper = new ThreeDRendererGridsHelper();
    this._threeDRendererAxesHelper = new ThreeDRendererAxesHelper();
    this.updateWithOptions(options);
    this.add(this._threeDRendererGridsHelper, this._threeDRendererAxesHelper);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererHelpersOptions>
  ): void {
    if (options.gridsHelper !== undefined) {
      this._threeDRendererGridsHelper.updateWithOptions(options.gridsHelper);
    }
    if (options.axesHelper !== undefined) {
      this._threeDRendererAxesHelper.updateWithOptions(options.axesHelper);
    }
  }

  public get threeDRendererGridsHelper(): ThreeDRendererGridsHelper {
    return this._threeDRendererGridsHelper;
  }
}

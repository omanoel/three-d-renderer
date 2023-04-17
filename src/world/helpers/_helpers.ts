import { Group } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  DEFAULT_GRID_HELPERS_OPTIONS,
  ThreeDRendererGridHelpers,
  ThreeDRendererGridHelpersOptions,
} from "./grid-helpers";

export interface ThreeDRendererHelpersOptions {
  gridHelpers: ThreeDRendererGridHelpersOptions;
}

export const DEFAULT_HELPERS_OPTIONS: ThreeDRendererHelpersOptions = {
  gridHelpers: DEFAULT_GRID_HELPERS_OPTIONS,
};

export class ThreeDRendererHelpers
  extends Group
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererGridHelpers: ThreeDRendererGridHelpers;

  constructor(initOptions?: Partial<ThreeDRendererHelpersOptions>) {
    super();
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererGridHelpers = new ThreeDRendererGridHelpers();
    this.updateWithOptions(options);
    this.add(this._threeDRendererGridHelpers);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererHelpersOptions>
  ): void {
    if (options.gridHelpers !== undefined) {
      this._threeDRendererGridHelpers.updateWithOptions(options.gridHelpers);
    }
  }
}

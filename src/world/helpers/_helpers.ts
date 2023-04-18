import { Group } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import { ThreeDRendererGridsHelper } from "./grids-helper";
import { ThreeDRendererAxesHelper } from "./axes-helper";
import {
  ThreeDRendererHelpersOptions,
  DEFAULT_HELPERS_OPTIONS,
} from "./_helpers-options";
import { ThreeDRendererInfiniteGridsHelper } from "./infinite-grids-helper";
import { ThreeDRendererCamera } from "../basics/camera";
import { ThreeDRendererControls } from "../basics/controls";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { ThreeDRendererCrossPointer } from "./cross-pointer";

export class ThreeDRendererHelpers
  extends Group
  implements IConfigurable<ThreeDRendererHelpersOptions>
{
  private _threeDRendererGridsHelper: ThreeDRendererGridsHelper;
  private _threeDRendererAxesHelper: ThreeDRendererAxesHelper;
  private _threeDRendererInfiniteGridsHelper: ThreeDRendererInfiniteGridsHelper;
  private _threeDRendererCrossPointer: ThreeDRendererCrossPointer;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    threeDRendererCamera: ThreeDRendererCamera,
    threeDRendererControls: ThreeDRendererControls,
    font: Font,
    initOptions?: Partial<ThreeDRendererHelpersOptions>
  ) {
    super();
    const options = {
      ...DEFAULT_HELPERS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererGridsHelper = new ThreeDRendererGridsHelper();
    this._threeDRendererAxesHelper = new ThreeDRendererAxesHelper();
    this._threeDRendererInfiniteGridsHelper =
      new ThreeDRendererInfiniteGridsHelper(
        threeDRendererCamera,
        threeDRendererControls,
        font,
        options.infiniteGridsHelper
      );
    this._threeDRendererCrossPointer = new ThreeDRendererCrossPointer(
      options.crossPointer
    );
    this.updateWithOptions(options);
    this.add(
      this._threeDRendererGridsHelper,
      this._threeDRendererAxesHelper,
      this._threeDRendererInfiniteGridsHelper,
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
    if (options.infiniteGridsHelper !== undefined) {
      this._threeDRendererInfiniteGridsHelper.updateWithOptions(
        options.infiniteGridsHelper
      );
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
  public get threeDRendererInfiniteGridsHelper(): ThreeDRendererInfiniteGridsHelper {
    return this._threeDRendererInfiniteGridsHelper;
  }
  public get threeDRendererCrossPointer(): ThreeDRendererCrossPointer {
    return this._threeDRendererCrossPointer;
  }
}

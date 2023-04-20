import {
  ThreeDRendererAxesHelperOptions,
  DEFAULT_AXES_HELPER_OPTIONS,
} from "./axes-helper-options";
import {
  DEFAULT_CROSS_POINTER_OPTIONS,
  ThreeDRendererCrossPointerOptions,
} from "./cross-pointer-options";
import {
  ThreeDRendererGridsHelperOptions,
  DEFAULT_GRIDS_HELPER_OPTIONS,
} from "./grids-helper-options";

export interface ThreeDRendererHelpersOptions {
  gridsHelper: ThreeDRendererGridsHelperOptions;
  axesHelper: ThreeDRendererAxesHelperOptions;
  crossPointer: ThreeDRendererCrossPointerOptions;
}

export const DEFAULT_HELPERS_OPTIONS: ThreeDRendererHelpersOptions = {
  gridsHelper: DEFAULT_GRIDS_HELPER_OPTIONS,
  axesHelper: DEFAULT_AXES_HELPER_OPTIONS,
  crossPointer: DEFAULT_CROSS_POINTER_OPTIONS,
};

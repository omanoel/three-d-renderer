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
import {
  DEFAULT_INFINITE_GRIDS_HELPER_OPTIONS,
  ThreeDRendererInfiniteGridsHelperOptions,
} from "./infinite-grids-helper-options";

export interface ThreeDRendererHelpersOptions {
  gridsHelper: ThreeDRendererGridsHelperOptions;
  axesHelper: ThreeDRendererAxesHelperOptions;
  infiniteGridsHelper: ThreeDRendererInfiniteGridsHelperOptions;
  crossPointer: ThreeDRendererCrossPointerOptions;
}

export const DEFAULT_HELPERS_OPTIONS: ThreeDRendererHelpersOptions = {
  gridsHelper: DEFAULT_GRIDS_HELPER_OPTIONS,
  axesHelper: DEFAULT_AXES_HELPER_OPTIONS,
  infiniteGridsHelper: DEFAULT_INFINITE_GRIDS_HELPER_OPTIONS,
  crossPointer: DEFAULT_CROSS_POINTER_OPTIONS,
};

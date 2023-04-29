import {
  DEFAULT_AXES_HELPER_OPTIONS,
  ThreeDRendererAxesHelperOptions
} from './axes-helper-options';
import {
  DEFAULT_CROSS_POINTER_OPTIONS,
  ThreeDRendererCrossPointerOptions
} from './cross-pointer-options';
import {
  DEFAULT_GRIDS_HELPER_OPTIONS,
  ThreeDRendererGridsHelperOptions
} from './grids-helper-options';

export interface ThreeDRendererHelpersOptions {
  axesHelper: ThreeDRendererAxesHelperOptions;
  crossPointer: ThreeDRendererCrossPointerOptions;
  gridsHelper: ThreeDRendererGridsHelperOptions;
}

export const DEFAULT_HELPERS_OPTIONS: ThreeDRendererHelpersOptions = {
  axesHelper: DEFAULT_AXES_HELPER_OPTIONS,
  crossPointer: DEFAULT_CROSS_POINTER_OPTIONS,
  gridsHelper: DEFAULT_GRIDS_HELPER_OPTIONS
};

import {
  ThreeDRendererBasicsOptions,
  DEFAULT_BASICS_OPTIONS,
} from "./basics/_basics-options";
import {
  DEFAULT_COMPONENTS_OPTIONS,
  ThreeDRendererComponentsOptions,
} from "./components/_components-options";
import {
  ThreeDRendererHelpersOptions,
  DEFAULT_HELPERS_OPTIONS,
} from "./helpers/_helpers-options";
import {
  ThreeDRendererPanelsOptions,
  DEFAULT_PANELS_OPTIONS,
} from "./panels/_panels-options";

/**
 * Represents the options available to alter the properties
 * of the objects rendered
 */
export interface ThreeDRendererWorldOptions {
  basics: ThreeDRendererBasicsOptions;
  helpers: ThreeDRendererHelpersOptions;
  panels: ThreeDRendererPanelsOptions;
  components: ThreeDRendererComponentsOptions;
}

export const DEFAULT_WORLD_OPTIONS: ThreeDRendererWorldOptions = {
  basics: DEFAULT_BASICS_OPTIONS,
  helpers: DEFAULT_HELPERS_OPTIONS,
  panels: DEFAULT_PANELS_OPTIONS,
  components: DEFAULT_COMPONENTS_OPTIONS,
};

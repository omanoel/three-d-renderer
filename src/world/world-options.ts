import { ThreeDRendererPositionOptions } from '../shared/i-options';
import {
  DEFAULT_BASICS_OPTIONS,
  ThreeDRendererBasicsOptions,
} from './basics/_basics-options';
import {
  DEFAULT_COMPONENTS_OPTIONS,
  ThreeDRendererComponentsOptions,
} from './components/_components-options';
import {
  DEFAULT_HELPERS_OPTIONS,
  ThreeDRendererHelpersOptions,
} from './helpers/_helpers-options';
import {
  DEFAULT_PANELS_OPTIONS,
  ThreeDRendererPanelsOptions,
} from './panels/_panels-options';

/**
 * Represents the options available to alter the properties
 * of the objects rendered
 */
export interface ThreeDRendererWorldOptions {
  basics: ThreeDRendererBasicsOptions;
  helpers: ThreeDRendererHelpersOptions;
  panels: ThreeDRendererPanelsOptions;
  components: ThreeDRendererComponentsOptions;
  origin: ThreeDRendererPositionOptions;
}

export const DEFAULT_WORLD_OPTIONS: ThreeDRendererWorldOptions = {
  basics: DEFAULT_BASICS_OPTIONS,
  helpers: DEFAULT_HELPERS_OPTIONS,
  panels: DEFAULT_PANELS_OPTIONS,
  components: DEFAULT_COMPONENTS_OPTIONS,
  origin: {
    x: 100,
    y: 50,
    z: 70,
  },
};

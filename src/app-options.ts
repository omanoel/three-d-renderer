import { DEFAULT_BASICS_OPTIONS } from './world/basics/_basics-options';
import { DEFAULT_COMPONENTS_OPTIONS } from './world/components/_components-options';
import { DEFAULT_HELPERS_OPTIONS } from './world/helpers/_helpers-options';
import { DEFAULT_PANELS_OPTIONS } from './world/panels/_panels-options';
import { ThreeDRendererWorldOptions } from './world/world-options';

export interface AppOptions extends ThreeDRendererWorldOptions {
  //
}

export const DEFAULT_APP_OPTIONS: AppOptions = {
  basics: DEFAULT_BASICS_OPTIONS,
  components: DEFAULT_COMPONENTS_OPTIONS,
  helpers: DEFAULT_HELPERS_OPTIONS,
  panels: DEFAULT_PANELS_OPTIONS,
  worldOrigin: {
    x: 0,
    y: 0,
    z: 0
  },
  displayStats: true
};

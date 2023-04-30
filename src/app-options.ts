import {
  DEFAULT_WORLD_OPTIONS,
  ThreeDRendererWorldOptions
} from './world/world-options';

export interface AppOptions extends ThreeDRendererWorldOptions {
  //
}

export const DEFAULT_APP_OPTIONS: AppOptions = {
  ...DEFAULT_WORLD_OPTIONS
};

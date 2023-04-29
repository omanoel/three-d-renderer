import {
  ThreeDRendererAmbientLightOptions,
  DEFAULT_AMBIENT_LIGHT_OPTIONS
} from './ambient-light-options';
import {
  ThreeDRendererDirectionalLightOptions,
  DEFAULT_DIRECTIONAL_LIGHT_OPTIONS
} from './directional-light-options';

export interface ThreeDRendererComponentsOptions {
  ambientLight: ThreeDRendererAmbientLightOptions;
  directionalLight: ThreeDRendererDirectionalLightOptions;
}

export const DEFAULT_COMPONENTS_OPTIONS: ThreeDRendererComponentsOptions = {
  ambientLight: DEFAULT_AMBIENT_LIGHT_OPTIONS,
  directionalLight: DEFAULT_DIRECTIONAL_LIGHT_OPTIONS
};

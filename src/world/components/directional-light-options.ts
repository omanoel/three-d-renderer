import { ColorRepresentation } from 'three';
import { SharedPositionOptions } from '../../shared/i-options';

export interface ThreeDRendererDirectionalLightOptions {
  color: ColorRepresentation;
  intensity: number;
  position: SharedPositionOptions;
}

export const DEFAULT_DIRECTIONAL_LIGHT_OPTIONS: ThreeDRendererDirectionalLightOptions =
  {
    color: 'white',
    intensity: 5,
    position: {
      x: 100,
      y: 100,
      z: 100
    }
  };

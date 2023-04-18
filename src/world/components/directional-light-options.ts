import { ColorRepresentation } from "three";
import { ThreeDRendererPositionOptions } from "../../shared/i-options";

export interface ThreeDRendererDirectionalLightOptions {
  color: ColorRepresentation;
  intensity: number;
  position: ThreeDRendererPositionOptions;
}

export const DEFAULT_DIRECTIONAL_LIGHT_OPTIONS: ThreeDRendererDirectionalLightOptions =
  {
    color: "white",
    intensity: 5,
    position: {
      x: 10,
      y: 10,
      z: 10,
    },
  };

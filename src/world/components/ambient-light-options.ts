import { ColorRepresentation } from "three";

export interface ThreeDRendererAmbientLightOptions {
  color: ColorRepresentation;
  intensity: number;
}

export const DEFAULT_AMBIENT_LIGHT_OPTIONS: ThreeDRendererAmbientLightOptions =
  {
    color: "white",
    intensity: 0.2,
  };

import { ColorRepresentation } from "three";

export interface ThreeDRendererCrossPointerOptions {
  lineWidth: number;
  lineLength: number;
  color: ColorRepresentation;
}

export const DEFAULT_CROSS_POINTER_OPTIONS: ThreeDRendererCrossPointerOptions =
  {
    lineWidth: 2,
    lineLength: 0.25,
    color: "red",
  };

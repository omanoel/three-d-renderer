import { ColorRepresentation } from "three";

export interface ThreeDRendererGridsHelperOptions {
  size: number;
  divisions: number;
  color: ColorRepresentation;
}

export const DEFAULT_GRIDS_HELPER_OPTIONS: ThreeDRendererGridsHelperOptions = {
  size: 10,
  divisions: 10,
  color: "grey",
};

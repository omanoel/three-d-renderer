import { ColorRepresentation } from "three";
import {
  ThreeDRendererLabelOptions,
  ThreeDRendererObject3DOptions,
} from "../../shared/i-options";

export interface ThreeDRendererGridsHelperOptions {
  divisions: number;
  size: number;
  xy: ThreeDRendererGridsHelperPlaneOptions;
  xz: ThreeDRendererGridsHelperPlaneOptions;
  yz: ThreeDRendererGridsHelperPlaneOptions;
  xLabel: ThreeDRendererLabelOptions;
  yLabel: ThreeDRendererLabelOptions;
  zLabel: ThreeDRendererLabelOptions;
}

export interface ThreeDRendererGridsHelperPlaneOptions
  extends ThreeDRendererObject3DOptions {
  color: ColorRepresentation;
  opacity: number;
}

export const DEFAULT_GRIDS_HELPER_OPTIONS: ThreeDRendererGridsHelperOptions = {
  divisions: 10,
  size: 10,
  xLabel: {
    visible: true,
    units: "m",
  },
  yLabel: {
    visible: true,
    units: "m",
  },
  zLabel: {
    visible: true,
    units: "m",
  },
  xy: {
    visible: true,
    color: "grey",
    opacity: 0.5,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  xz: {
    visible: true,
    color: "grey",
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  yz: {
    visible: true,
    color: "grey",
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

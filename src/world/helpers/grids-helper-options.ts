import { ColorRepresentation } from 'three';
import {
  SharedLabelOptions,
  SharedObject3DOptions,
  SharedPositionOptions,
} from '../../shared/i-options';

export interface ThreeDRendererGridsHelperOptions {
  worldOrigin: SharedPositionOptions;
  divisions: number;
  size: number;
  xy: ThreeDRendererGridsHelperPlaneOptions;
  xz: ThreeDRendererGridsHelperPlaneOptions;
  yz: ThreeDRendererGridsHelperPlaneOptions;
  xLabel: SharedLabelOptions;
  yLabel: SharedLabelOptions;
  zLabel: SharedLabelOptions;
}

export interface ThreeDRendererGridsHelperPlaneOptions
  extends SharedObject3DOptions {
  color: ColorRepresentation;
  opacity: number;
}

export const DEFAULT_GRIDS_HELPER_OPTIONS: ThreeDRendererGridsHelperOptions = {
  worldOrigin: {
    x: 0,
    y: 0,
    z: 0,
  },
  divisions: 10,
  size: 100,
  xLabel: {
    visible: true,
    units: 'm',
  },
  yLabel: {
    visible: true,
    units: 'm',
  },
  zLabel: {
    visible: true,
    units: 'm',
  },
  xy: {
    visible: true,
    color: 'grey',
    opacity: 0.5,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  xz: {
    visible: true,
    color: 'grey',
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  yz: {
    visible: true,
    color: 'grey',
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

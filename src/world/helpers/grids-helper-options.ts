import { ColorRepresentation } from 'three';
import {
  SharedLabelOptions,
  SharedObject3DOptions
} from '../../shared/i-options';

export interface ThreeDRendererGridsHelperOptions
  extends SharedObject3DOptions {
  /**
   * if true, the scale is updated relative to the distance between camera and target
   */
  autoScale: boolean;
  /**
   * if true, the position is set relative to controls target position
   */
  trackTarget: boolean;
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
  autoScale: true,
  trackTarget: true,
  visible: true,
  position: {
    x: 200,
    y: 100,
    z: 0
  },
  divisions: 10,
  size: 100,
  xLabel: {
    visible: true,
    units: 'm'
  },
  yLabel: {
    visible: true,
    units: 'm'
  },
  zLabel: {
    visible: true,
    units: 'm'
  },
  xy: {
    visible: true,
    color: 'grey',
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  xz: {
    visible: true,
    color: 'grey',
    opacity: 0.5,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  yz: {
    visible: true,
    color: 'grey',
    opacity: 0.2,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  }
};

export const GRIDS_HELPER_SIZES = [
  0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000,
  2000, 5000, 10000, 20000, 50000, 1000000
];

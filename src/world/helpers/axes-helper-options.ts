import { ColorRepresentation } from 'three';
import { SharedObject3DOptions } from '../../shared/i-options';

/**
 * Represents the options available to alter the properties
 * of the AxisHelper (AxisArrow[]) object(s) rendered by the library
 */
export interface ThreeDRendererAxesHelperOptions extends SharedObject3DOptions {
  /**
   * Length of the Axis Arrow
   *
   * @defaultValue 1
   */
  length: number;
  /**
   * True if size of axes depends on distance to camera
   */
  autoScale: boolean;
  /**
   * True if axes are positionned on controls target position
   */
  trackTarget: boolean;
  /**
   * Represents the options available to alter the properties
   * of the X AxisArrow object rendered by the library
   */
  x: ThreeDRendererAxisHelperOptions;
  /**
   * Represents the options available to alter the properties
   * of the Y AxisArrow object rendered by the library
   */
  y: ThreeDRendererAxisHelperOptions;
  /**
   * Represents the options available to alter the properties
   * of the Z AxisArrow object rendered by the library
   */
  z: ThreeDRendererAxisHelperOptions;
  /**
   * Color of all the axis arrows.
   *
   * @defaultValue 'grey'
   */
  color: ColorRepresentation;
}

/**
 * Represents the options available to alter the properties
 * of the AxisArrow object rendered by the library
 */
export interface ThreeDRendererAxisHelperOptions extends SharedObject3DOptions {
  /**
   * Invert the Axis Arrow if true
   *
   * @defaultValue false
   */
  inverted: boolean;
  /**
   * Color of the Axis Arrow.
   *
   * @defaultValue 'red' for X, 'green' for Y, 'blue' for Z
   */
  color: ColorRepresentation;
}

export const DEFAULT_AXES_HELPER_OPTIONS: ThreeDRendererAxesHelperOptions = {
  visible: true,
  length: 2,
  autoScale: false,
  trackTarget: true,
  color: 'grey',
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  x: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    inverted: false,
    color: 'red'
  },
  y: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    inverted: false,
    color: 'green'
  },
  z: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    inverted: false,
    color: 'blue'
  }
};

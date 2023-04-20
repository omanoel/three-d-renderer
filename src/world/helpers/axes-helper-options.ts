import { ColorRepresentation } from "three";
import { ThreeDRendererObject3DOptions } from "../../shared/i-options";

/**
 * Represents the options available to alter the properties
 * of the AxisHelper (AxisArrow[]) object(s) rendered by the library
 */
export interface ThreeDRendererAxesHelperOptions
  extends ThreeDRendererObject3DOptions {
  /**
   * Length of the Axis Arrow
   *
   * @defaultValue 1
   */
  length: number;
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
}

/**
 * Represents the options available to alter the properties
 * of the AxisArrow object rendered by the library
 */
export interface ThreeDRendererAxisHelperOptions
  extends ThreeDRendererObject3DOptions {
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
  length: 5,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  x: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    inverted: false,
    color: "red",
  },
  y: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    inverted: false,
    color: "green",
  },
  z: {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    inverted: true,
    color: "blue",
  },
};

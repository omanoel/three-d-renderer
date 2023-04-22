export interface SharedPositionOptions {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents the options available to alter the properties
 * of generic 3D Object rendered by the library
 */
export interface SharedObject3DOptions {
  /**
   * Object gets rendered if true. Default is true.
   *
   * @defaultValue true
   */
  visible: boolean;
  /**
   * Representing the object's local position.
   * Default is (0, 0, 0)
   */
  position: SharedPositionOptions;
}

export type SharedAxisTypes = 'x' | 'y' | 'z';

export interface SharedLabelOptions {
  visible: boolean;
  units: string;
}

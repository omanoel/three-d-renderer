import { ColorRepresentation } from 'three';

export interface ThreeDRendererTargetHelperOptions {
  /**
   * True if size of circle depends on distance to camera
   */
  autoScale: boolean;
  /**
   * Radius of the circle
   */
  radius: number;
  /**
   * Color of the circle and arrows.
   *
   * @defaultValue 'grey'
   */
  color: ColorRepresentation;
}

export const DEFAULT_TARGET_HELPER_OPTIONS: ThreeDRendererTargetHelperOptions =
  {
    autoScale: true,
    radius: 0.2,
    color: 'grey'
  };

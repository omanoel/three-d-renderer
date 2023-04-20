import { ThreeDRendererPositionOptions } from "../../shared/i-options";

/**
 * Represents the options available to alter the properties
 * of the Camera object rendered by the library
 */
export interface ThreeDRendererCameraOptions {
  /**
   * Camera frustum vertical field of view
   *
   * @defaultValue 50
   */
  fov: number;
  /**
   * Aspect ratio
   *
   * @defaultValue 1
   */
  aspect: number;
  /**
   * Camera frustum near plane.
   *
   * @defaultValue 0.1
   */
  near: number;
  /**
   * Camera frustum far plane.
   *
   * @defaultValue 20000
   */
  far: number;
  /**
   * Representing the object's local position.
   *
   * @defaultValue (25, 25, 25)
   */
  position: ThreeDRendererPositionOptions;
  /**
   * Representing the camera's initial target point.
   *
   * @efaultValue (0, 0, 0)
   */
  lookAt: ThreeDRendererPositionOptions;
}

export const DEFAULT_CAMERA_OPTIONS: ThreeDRendererCameraOptions = {
  fov: 50,
  aspect: 1,
  near: 0.1,
  far: 20000,
  position: {
    x: -25,
    y: -25,
    z: 25,
  },
  lookAt: {
    x: 0,
    y: 0,
    z: 0,
  },
};

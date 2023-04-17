import { PerspectiveCamera } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import { ThreeDRendererPositionOptions } from "../../shared/position-options";

export interface ThreeDRendererCameraOptions {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: ThreeDRendererPositionOptions;
}

export const DEFAULT_CAMERA_OPTIONS: ThreeDRendererCameraOptions = {
  fov: 35,
  aspect: 1,
  near: 0.1,
  far: 100,
  position: {
    x: 10,
    y: 10,
    z: 10,
  },
};

export class ThreeDRendererCamera
  extends PerspectiveCamera
  implements IConfigurable<ThreeDRendererCameraOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererCameraOptions>) {
    super();
    this.up.set(0, 0, 1);
    const options = {
      ...DEFAULT_CAMERA_OPTIONS,
      ...initOptions,
    };
    this.updateWithOptions(options);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererCameraOptions>
  ): void {
    if (options.fov !== undefined) {
      this.fov = options.fov;
    }
    if (options.aspect !== undefined) {
      this.aspect = options.aspect;
    }
    if (options.near !== undefined) {
      this.near = options.near;
    }
    if (options.far !== undefined) {
      this.far = options.far;
    }
    if (options.position !== undefined) {
      this.position.set(
        options.position.x,
        options.position.y,
        options.position.z
      );
    }
  }
}
import { PerspectiveCamera } from 'three';

export class ExpandedCamera {
  //
  private _camera: PerspectiveCamera;
  //
  constructor() {
    this._camera = new PerspectiveCamera(
      35, // fov = Field Of View
      1, // aspect ratio (dummy value)
      0.1, // near clipping plane
      100 // far clipping plane
    );
    // move the camera back so we can view the scene
    this._camera.position.set(0, 0, 10);
  }
  //
  public get camera(): PerspectiveCamera {
    return this._camera;
  }
}

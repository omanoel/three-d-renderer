import { PerspectiveCamera, WebGLRenderer } from 'three';

export class ExpandedWindowResizer {
  //
  constructor(
    container: HTMLDivElement,
    renderer: WebGLRenderer,
    camera: PerspectiveCamera
  ) {
    this._setSize(container, renderer, camera);
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      this._setSize(container, renderer, camera);
      // perform any custom actions
      this.onResize();
    });
  }

  public onResize(): void {
    // can be called from outside with specific behavior
  }

  private _setSize(
    container: HTMLDivElement,
    renderer: WebGLRenderer,
    camera: PerspectiveCamera
  ): void {
    // Set the camera's aspect ratio to match the container's proportions
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

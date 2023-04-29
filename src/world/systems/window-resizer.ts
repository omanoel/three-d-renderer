import { ThreeDRendererRenderer } from './renderer';
import { ThreeDRendererCamera } from '../basics/camera';

export class ThreeDRendererWindowResizer {
  //
  constructor(
    domContainer: HTMLDivElement,
    renderer: ThreeDRendererRenderer,
    camera: ThreeDRendererCamera
  ) {
    this._setSize(domContainer, renderer, camera);
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      this._setSize(domContainer, renderer, camera);
      // perform any custom actions
      this.onResize();
    });
  }

  public onResize(): void {
    // can be called from outside with specific behavior
  }

  private _setSize(
    domContainer: HTMLDivElement,
    renderer: ThreeDRendererRenderer,
    camera: ThreeDRendererCamera
  ): void {
    // Set the camera's aspect ratio to match the container's proportions
    camera.aspect = domContainer.clientWidth / domContainer.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // next, set the renderer to the same size as our container element
    renderer.setSize(domContainer.clientWidth, domContainer.clientHeight);

    // finally, set the pixel ratio to ensure our scene will look good on mobile devices
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

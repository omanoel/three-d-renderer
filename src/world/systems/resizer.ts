import { PerspectiveCamera, WebGLRenderer } from 'three';

import { ThreeDRendererCamera } from '../basics/camera';
import { ThreeDRendererRenderer } from './renderer';

export class ThreeDRendererResizer {
  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    domContainer: HTMLDivElement,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererCamera: ThreeDRendererCamera
  ) {
    this._setSize(domContainer.clientWidth, domContainer.clientHeight, threeDRendererRenderer, threeDRendererCamera);
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length) {
        const entry = entries[0];
        this._setSize(entry.contentRect.width, entry.contentRect.height, threeDRendererRenderer, threeDRendererCamera);
        this.onResize();
      }
    });
    resizeObserver.observe(domContainer);
  }

  // =======================================
  // PUBLIC
  // =======================================
  public onResize(): void {
    // Empty here
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _setSize(width: number, height: number, renderer: WebGLRenderer, camera: PerspectiveCamera): void {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}
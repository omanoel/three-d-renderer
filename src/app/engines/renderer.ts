import { WebGLRenderer } from 'three';

export class ExpandedRenderer {
  //
  private _renderer: WebGLRenderer;
  //
  constructor() {
    this._renderer = new WebGLRenderer({ antialias: true });
  }
  //
  public get renderer(): WebGLRenderer {
    return this._renderer;
  }
}

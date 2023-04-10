import { DirectionalLight } from 'three';

export class ExpandedDirectionalLight {
  //
  private _light: DirectionalLight;
  //
  constructor() {
    // Create a directional light
    this._light = new DirectionalLight('white', 5);

    // move the light right, up, and towards us
    this._light.position.set(10, 10, 10);
  }
  //
  public get light(): DirectionalLight {
    return this._light;
  }
}

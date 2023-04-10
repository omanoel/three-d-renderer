import { AmbientLight } from 'three';

export class ExpandedAmbientLight {
  //
  private _light: AmbientLight;
  //
  constructor() {
    // Create a directional light
    this._light = new AmbientLight('white', 0.5);
  }
  //
  public get light(): AmbientLight {
    return this._light;
  }
}

import { Color, Scene } from 'three';

export class ExpandedScene {
  //
  private _scene: Scene;
  //
  constructor() {
    this._scene = new Scene();
    this._scene.background = new Color('skyblue');
  }
  //
  public get scene(): Scene {
    return this._scene;
  }
}

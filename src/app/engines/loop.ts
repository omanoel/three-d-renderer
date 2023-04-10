import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { AbstractTickable } from '../components/abstracts/abstract-tickable';

export class ExpandedLoop {
  //
  private _camera: PerspectiveCamera;
  private _scene: Scene;
  private _renderer: WebGLRenderer;
  private _clock: Clock;
  private _tickables: AbstractTickable[];
  constructor(
    renderer: WebGLRenderer,
    camera: PerspectiveCamera,
    scene: Scene
  ) {
    this._camera = camera;
    this._scene = scene;
    this._renderer = renderer;
    this._clock = new Clock();
    this._tickables = [];
  }
  //
  public get tickables(): AbstractTickable[] {
    return this._tickables;
  }
  //
  public start(): void {
    // start the loop
    this._renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this._renderer.render(this._scene, this._camera);
    });
  }
  //
  public stop(): void {
    // start the loop
    this._renderer.setAnimationLoop(null);
  }

  public tick(): void {
    // only call the getDelta function once per frame!
    const delta = this._clock.getDelta();
    // Code to update animations will go here
    for (const object of this._tickables) {
      object.tick(delta);
    }
  }
}

import { Clock } from 'three';
import { ThreeDRendererCamera } from '../basics/camera';
import { ThreeDRendererScene } from '../basics/scene';
import { ThreeDRendererRenderer } from './renderer';

export class ThreeDRendererLoop {
  //
  private _camera: ThreeDRendererCamera;
  private _scene: ThreeDRendererScene;
  private _renderer: ThreeDRendererRenderer;
  private _clock: Clock;
  constructor(
    renderer: ThreeDRendererRenderer,
    camera: ThreeDRendererCamera,
    scene: ThreeDRendererScene
  ) {
    this._camera = camera;
    this._scene = scene;
    this._renderer = renderer;
    this._clock = new Clock();
  }
  //
  public start(): void {
    // start the loop
    this._renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.render();
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
    for (const object of this._scene.tickableObjects) {
      object.userData.tick(delta);
    }
  }

  public render(): void {
    // This method can be overriden in World
    this._renderer.render(this._scene, this._camera);
  }
}

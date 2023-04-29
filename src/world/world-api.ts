import { Object3D, Vector3 } from 'three';
import { ThreeDRendererWorld } from './world';
import { ThreeDRendererWorldOptions } from './world-options';

export class ThreeDRendererWorldApi {
  //
  private _world: ThreeDRendererWorld;
  //
  constructor(world: ThreeDRendererWorld) {
    this._world = world;
  }
  //
  public updateWithOptions(options: ThreeDRendererWorldOptions): void {
    this._world.threeDRendererBasics.updateWithOptions(options.basics);
    this._world.threeDRendererHelpers.updateWithOptions(options.helpers);
  }
  public addObject(obj: Object3D): void {
    const worldOrigin = new Vector3(
      this._world.options.worldOrigin.x,
      this._world.options.worldOrigin.y,
      this._world.options.worldOrigin.z
    );
    this._world.threeDRendererBasics.addObject(obj, worldOrigin);
  }
  public getObjectById(id: number): Object3D | undefined {
    return this._world.threeDRendererBasics.getObjectById(id);
  }
  public removeObjectById(id: number): void {
    this._world.threeDRendererBasics.removeObjectById(id);
  }
  public cleanScene(): void {
    this._world.threeDRendererBasics.cleanScene();
  }
  /**
   * Remove all the event listeners.
   */
  public dispose(): void {
    this._world.threeDRendererBasics.dispose();
  }
  public destroy(): void {
    this._world.threeDRendererBasics.destroy();
  }
  public resetView(): void {
    this._world.threeDRendererBasics.resetView();
  }
  public focusView(objects: Object3D[]): void {
    this._world.threeDRendererBasics.focusView(objects);
  }
  public hideByIds(ids: number[]): void {
    this._world.threeDRendererBasics.hideByIds(ids);
    this._world.render();
  }
  public showByIds(ids: number[]): void {
    this._world.threeDRendererBasics.showByIds(ids);
    this._world.render();
  }
  public showByType(type: string): void {
    this._world.threeDRendererBasics.showByType(type);
    this._world.render();
  }
  public hideByType(type: string): void {
    this._world.threeDRendererBasics.hideByType(type);
    this._world.render();
  }
}

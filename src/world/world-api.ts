import { Group, Object3D } from 'three';
import { ThreeDRendererBasics } from './basics/_basics';

export class ThreeDRendererWorldApi {
  private _threeDRendererBasics: ThreeDRendererBasics;
  constructor(threeDRendererBasics: ThreeDRendererBasics) {
    //
    this._threeDRendererBasics = threeDRendererBasics;
  }

  public addGroup(group: Group): void {
    this._threeDRendererBasics.addGroup(group);
  }
  public getGroupById(id: number): Object3D | undefined {
    return this._threeDRendererBasics.getGroupById(id);
  }
  public removeGroupById(id: number): void {
    this._threeDRendererBasics.removeGroupById(id);
  }
  public cleanScene(): void {
    this._threeDRendererBasics.cleanScene();
  }
  /**
   * Remove all the event listeners.
   */
  public dispose(): void {
    this._threeDRendererBasics.dispose();
  }
  public destroy(): void {
    this._threeDRendererBasics.destroy();
  }
}

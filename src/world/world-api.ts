import { Group, Object3D } from 'three';
import { ThreeDRendererBasics } from './basics/_basics';
import { ThreeDRendererPanels } from './panels/_panels';

export class ThreeDRendererWorldApi {
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _threeDRendererPanels: ThreeDRendererPanels;
  constructor(
    threeDRendererBasics: ThreeDRendererBasics,
    threeDRendererPanels: ThreeDRendererPanels
  ) {
    //
    this._threeDRendererBasics = threeDRendererBasics;
    this._threeDRendererPanels = threeDRendererPanels;
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
  public resetView(): void {
    this._threeDRendererBasics.resetView();
  }
  public showHowToNavigateDialogBox(): void {
    this._threeDRendererPanels.showHowToNavigateDialogBox();
  }
  public showDialogBox(id: string): void {
    this._threeDRendererPanels.showDialogBox(id);
  }
  public hideDialogBox(id: string): void {
    this._threeDRendererPanels.hideDialogBox(id);
  }
}

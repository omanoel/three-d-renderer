import { Group, Object3D } from 'three';
import { ThreeDRendererBasics } from './basics/_basics';
import { ThreeDRendererHelpers } from './helpers/_helpers';
import { ThreeDRendererPanels } from './panels/_panels';
import { ThreeDRendererWorldOptions } from './world-options';

export class ThreeDRendererWorldApi {
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _threeDRendererPanels: ThreeDRendererPanels;
  private _threeDRendererHelpers: ThreeDRendererHelpers;
  constructor(
    threeDRendererBasics: ThreeDRendererBasics,
    threeDRendererPanels: ThreeDRendererPanels,
    threeDRendererHelpers: ThreeDRendererHelpers
  ) {
    //
    this._threeDRendererBasics = threeDRendererBasics;
    this._threeDRendererPanels = threeDRendererPanels;
    this._threeDRendererHelpers = threeDRendererHelpers;
  }

  public updateWithOptions(options: ThreeDRendererWorldOptions): void {
    this._threeDRendererBasics.updateWithOptions(options.basics);
    this._threeDRendererPanels.updateWithOptions(options.panels);
    this._threeDRendererHelpers.updateWithOptions(options.helpers);
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
  public viewAll(): void {}
}

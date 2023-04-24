import { Group, Object3D, Vector3 } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import { SharedBoundingBoxUtil } from '../../shared/utils/bounding-box-util';
import { ThreeDRendererRenderer } from '../systems/renderer';
import {
  DEFAULT_BASICS_OPTIONS,
  ThreeDRendererBasicsOptions,
} from './_basics-options';
import { ThreeDRendererCamera } from './camera';
import { ThreeDRendererControls } from './controls';
import { ThreeDRendererRaycaster } from './raycaster';
import { ThreeDRendererScene } from './scene';

export class ThreeDRendererBasics
  implements IConfigurable<ThreeDRendererBasicsOptions>
{
  private _threeDRendererCamera: ThreeDRendererCamera;
  private _threeDRendererScene: ThreeDRendererScene;
  private _threeDRendererControls: ThreeDRendererControls;
  private _threeDRendererRaycaster: ThreeDRendererRaycaster;

  /**
   * Instance of Basics objects:
   * - Scene
   * - Camera
   * - Controls
   * - Raycaster
   *
   * @param domContainer The DOM container
   * @param threeDRendererRenderer The renderer
   * @param initOptions The options at the initialisation
   */
  constructor(
    domContainer: HTMLDivElement,
    threeDRendererRenderer: ThreeDRendererRenderer,
    initOptions?: Partial<ThreeDRendererBasicsOptions>
  ) {
    const options = {
      ...DEFAULT_BASICS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererScene = new ThreeDRendererScene(options.scene);
    this._threeDRendererCamera = new ThreeDRendererCamera(options.camera);
    this._threeDRendererControls = new ThreeDRendererControls(
      this._threeDRendererCamera,
      domContainer,
      options.controls
    );
    this._threeDRendererRaycaster = new ThreeDRendererRaycaster(
      domContainer,
      threeDRendererRenderer,
      this._threeDRendererScene,
      this._threeDRendererCamera
    );
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererBasicsOptions>
  ): void {
    if (options.scene !== undefined) {
      this._threeDRendererScene.updateWithOptions(options.scene);
    }
    if (options.camera !== undefined) {
      this._threeDRendererCamera.updateWithOptions(options.camera);
    }
    if (options.controls !== undefined) {
      this._threeDRendererControls.updateWithOptions(options.controls);
    }
    if (options.raycaster !== undefined) {
      this._threeDRendererRaycaster.updateWithOptions(options.raycaster);
    }
  }

  public addGroup(group: Group, worldOrigin: Vector3): void {
    this._threeDRendererScene.addGroup(group, worldOrigin);
  }
  public removeGroupById(id: number): void {
    this._threeDRendererScene.removeGroupById(id);
  }
  public getGroupById(id: number): Object3D | undefined {
    return this._threeDRendererScene.getGroupById(id);
  }
  public cleanScene(): void {
    this._threeDRendererScene.cleanScene();
  }
  /**
   * Remove all the event listeners.
   */
  public dispose(): void {
    this._threeDRendererControls.dispose();
    this._threeDRendererRaycaster.dispose();
  }
  public destroy(): void {
    this.dispose();
    this._threeDRendererScene.clear();
  }
  public resetView(): void {
    this._threeDRendererControls.resetView();
  }
  public focusView(): void {
    const minMax = SharedBoundingBoxUtil.computeFromObjects(
      this._threeDRendererScene.cleanableObjects
    );
    const newTargetPos = new Vector3(
      (minMax[1].x + minMax[0].x) / 2,
      (minMax[1].y + minMax[0].y) / 2,
      (minMax[1].z + minMax[0].z) / 2
    );
    const distanceMinMax = minMax[0].distanceTo(minMax[1]);
    this._threeDRendererControls.setTarget(newTargetPos);
    this._threeDRendererCamera.position.set(
      newTargetPos.x - distanceMinMax,
      newTargetPos.y - distanceMinMax,
      newTargetPos.y + distanceMinMax
    );
    this._threeDRendererControls.update();
    this._threeDRendererControls.dispatchEvent({
      type: 'change',
      target: this._threeDRendererControls,
    });
  }

  // =======================================
  // GETTER
  // =======================================
  public get threeDRendererScene(): ThreeDRendererScene {
    return this._threeDRendererScene;
  }
  public get threeDRendererCamera(): ThreeDRendererCamera {
    return this._threeDRendererCamera;
  }
  public get threeDRendererControls(): ThreeDRendererControls {
    return this._threeDRendererControls;
  }
  public get threeDRendererRaycaster(): ThreeDRendererRaycaster {
    return this._threeDRendererRaycaster;
  }
}

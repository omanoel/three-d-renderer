import { IConfigurable } from "../../shared/i-configurable";
import { ThreeDRendererCamera } from "./camera";
import { ThreeDRendererScene } from "./scene";
import { ThreeDRendererControls } from "./controls";
import {
  ThreeDRendererBasicsOptions,
  DEFAULT_BASICS_OPTIONS,
} from "./_basics-options";
import { ThreeDRendererRaycaster } from "./raycaster";
import { ThreeDRendererRenderer } from "../systems/renderer";

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

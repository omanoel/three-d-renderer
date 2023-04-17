import { IConfigurable } from "../../shared/i-configurable";
import {
  DEFAULT_CAMERA_OPTIONS,
  ThreeDRendererCamera,
  ThreeDRendererCameraOptions,
} from "./camera";
import {
  DEFAULT_SCENE_OPTIONS,
  ThreeDRendererScene,
  ThreeDRendererSceneOptions,
} from "./scene";
import {
  DEFAULT_CONTROLS_OPTIONS,
  ThreeDRendererControls,
  ThreeDRendererControlsOptions,
} from "./controls";

export interface ThreeDRendererBasicsOptions {
  camera: ThreeDRendererCameraOptions;
  scene: ThreeDRendererSceneOptions;
  controls: ThreeDRendererControlsOptions;
}

export const DEFAULT_BASICS_OPTIONS: ThreeDRendererBasicsOptions = {
  camera: DEFAULT_CAMERA_OPTIONS,
  scene: DEFAULT_SCENE_OPTIONS,
  controls: DEFAULT_CONTROLS_OPTIONS,
};

export class ThreeDRendererBasics
  implements IConfigurable<ThreeDRendererBasicsOptions>
{
  private _threeDRendererCamera: ThreeDRendererCamera;
  private _threeDRendererScene: ThreeDRendererScene;
  private _threeDRendererControls: ThreeDRendererControls;

  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererBasicsOptions>
  ) {
    const options = {
      ...DEFAULT_BASICS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererCamera = new ThreeDRendererCamera(options.camera);
    this._threeDRendererScene = new ThreeDRendererScene(options.scene);
    this._threeDRendererControls = new ThreeDRendererControls(
      this._threeDRendererCamera,
      domContainer,
      options.controls
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
  }

  public get threeDRendererCamera(): ThreeDRendererCamera {
    return this._threeDRendererCamera;
  }

  public get threeDRendererScene(): ThreeDRendererScene {
    return this._threeDRendererScene;
  }

  public get threeDRendererControls(): ThreeDRendererControls {
    return this._threeDRendererControls;
  }
}

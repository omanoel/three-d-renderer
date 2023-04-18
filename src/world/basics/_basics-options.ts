import {
  ThreeDRendererCameraOptions,
  DEFAULT_CAMERA_OPTIONS,
} from "./camera-options";
import {
  ThreeDRendererControlsOptions,
  DEFAULT_CONTROLS_OPTIONS,
} from "./controls-options";
import {
  DEFAULT_RAYCASTER_OPTIONS,
  ThreeDRendererRaycasterOptions,
} from "./raycaster-options";
import {
  ThreeDRendererSceneOptions,
  DEFAULT_SCENE_OPTIONS,
} from "./scene-options";

export interface ThreeDRendererBasicsOptions {
  camera: ThreeDRendererCameraOptions;
  scene: ThreeDRendererSceneOptions;
  controls: ThreeDRendererControlsOptions;
  raycaster: ThreeDRendererRaycasterOptions;
}

export const DEFAULT_BASICS_OPTIONS: ThreeDRendererBasicsOptions = {
  camera: DEFAULT_CAMERA_OPTIONS,
  scene: DEFAULT_SCENE_OPTIONS,
  controls: DEFAULT_CONTROLS_OPTIONS,
  raycaster: DEFAULT_RAYCASTER_OPTIONS,
};

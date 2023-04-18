import { ColorRepresentation } from "three";

export interface ThreeDRendererSceneOptions {
  /**
   * Color property of the Scene's background. CSS predefined colors
   *
   * @defaultValue 'black'
   */
  backgroundColor: ColorRepresentation;
}

export const DEFAULT_SCENE_OPTIONS: ThreeDRendererSceneOptions = {
  backgroundColor: "black",
};

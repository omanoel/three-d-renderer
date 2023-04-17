import { Color, ColorRepresentation, Scene } from "three";
import { IConfigurable } from "../../shared/i-configurable";

export interface ThreeDRendererSceneOptions {
  backgroundColor: ColorRepresentation;
}

export const DEFAULT_SCENE_OPTIONS: ThreeDRendererSceneOptions = {
  backgroundColor: "black",
};

export class ThreeDRendererScene
  extends Scene
  implements IConfigurable<ThreeDRendererSceneOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererSceneOptions>) {
    super();
    const options = {
      ...DEFAULT_SCENE_OPTIONS,
      ...initOptions,
    };
    this.updateWithOptions(options);
  }

  public updateWithOptions(options: Partial<ThreeDRendererSceneOptions>): void {
    if (options.backgroundColor !== undefined) {
      this.background = new Color(options.backgroundColor);
    }
  }
}

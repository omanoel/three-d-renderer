import { Color, Object3D, Scene } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  ThreeDRendererSceneOptions,
  DEFAULT_SCENE_OPTIONS,
} from "./scene-options";

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

  public get countObjects(): number {
    return this._countChildren(this);
  }

  private _countChildren(obj: Object3D): number {
    let z = 1;
    obj.children.forEach((c: Object3D) => {
      z += this._countChildren(c);
    });
    return z;
  }
}

import { Color, Group, Object3D, Scene } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  ThreeDRendererSceneOptions,
  DEFAULT_SCENE_OPTIONS,
} from './scene-options';

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
  public addGroup(group: Group): void {
    this.add(group);
  }
  public getGroupById(id: number): Object3D | undefined {
    return this.getObjectById(id);
  }
  public removeGroupById(id: number): void {
    this.getObjectById(id)?.removeFromParent();
  }
  public cleanScene(): void {
    this.children
      .filter((c) => c.userData.cleanable !== undefined)
      .forEach((c) => c.removeFromParent());
  }

  private _countChildren(obj: Object3D): number {
    let z = 1;
    obj.children.forEach((c: Object3D) => {
      z += this._countChildren(c);
    });
    return z;
  }
}

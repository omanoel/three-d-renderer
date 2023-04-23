import { Color, Group, Object3D, Scene, Vector3 } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  DEFAULT_SCENE_OPTIONS,
  ThreeDRendererSceneOptions,
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
    return this._countObjects(this);
  }
  public get cleanableObjects(): Object3D[] {
    return this.children.filter((c) => c.userData.cleanable !== undefined);
  }
  public get tickableObjects(): Object3D[] {
    return this.children.filter((c) => c.userData.tickable !== undefined);
  }
  public addGroup(group: Group, worldOrigin: Vector3): void {
    const worldPos = new Vector3().copy(group.position).sub(worldOrigin);
    group.position.set(worldPos.x, worldPos.y, worldPos.z);
    this.add(group);
  }
  public getGroupById(id: number): Object3D | undefined {
    return this.getObjectById(id);
  }
  public removeGroupById(id: number): void {
    this.getObjectById(id)?.removeFromParent();
  }
  public cleanScene(): void {
    this.cleanableObjects.forEach((c) => c.removeFromParent());
  }

  private _countObjects(obj: Object3D): number {
    let z = 1;
    obj.children.forEach((c: Object3D) => {
      z += this._countObjects(c);
    });
    return z;
  }
}

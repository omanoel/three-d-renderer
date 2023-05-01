import { Color, Object3D, Scene, Vector3 } from 'three';
import { IConfigurable } from '../../shared/interfaces';
import {
  DEFAULT_SCENE_OPTIONS,
  ThreeDRendererSceneOptions
} from './scene-options';

export class ThreeDRendererScene
  extends Scene
  implements IConfigurable<ThreeDRendererSceneOptions>
{
  private _clickables: Object3D[] = [];
  private _tickables: Object3D[] = [];
  private _cleanables: Object3D[] = [];
  constructor(initOptions?: Partial<ThreeDRendererSceneOptions>) {
    super();
    const options = {
      ...DEFAULT_SCENE_OPTIONS,
      ...initOptions
    };
    if (options.cubeTexture !== undefined) {
      this.background = options.cubeTexture;
    } else {
      this.background = new Color(options.backgroundColor);
    }
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
    return this._cleanables;
  }
  public get tickableObjects(): Object3D[] {
    return this._tickables;
  }
  public get clickableObjects(): Object3D[] {
    return this._clickables;
  }

  public addObject(obj: Object3D, worldOrigin: Vector3): void {
    const worldPos = new Vector3()
      .copy(obj.userData.options.position)
      .sub(worldOrigin);
    obj.position.set(worldPos.x, worldPos.y, worldPos.z);
    this.add(obj);
    this._addObjectToCleanables(obj);
    this._addObjectToClickables(obj);
    this._addObjectToTickables(obj);
  }
  public removeObjectById(id: number): void {
    const obj = this.getObjectById(id);
    if (obj !== undefined) {
      this.removeObject(obj);
    }
  }
  public removeObject(obj: Object3D): void {
    this._delObjectToCleanables(obj);
    this._delObjectToClickables(obj);
    this._delObjectToTickables(obj);
    obj.removeFromParent();
  }
  public cleanScene(): void {
    this._cleanables.forEach((c) => this.removeObject(c));
  }
  public hideByIds(ids: number[]): void {
    ids.forEach((id: number) => {
      const obj = this.getObjectById(id);
      if (obj !== undefined && obj.visible) {
        this._delObjectToClickables(obj);
        obj.visible = false;
      }
    });
  }
  public showByIds(ids: number[]): void {
    ids.forEach((id: number) => {
      const obj = this.getObjectById(id);
      if (obj !== undefined && !obj.visible) {
        this._addObjectToClickables(obj);
        obj.visible = true;
      }
    });
  }
  public getObjectsByType(type: string, objs: Object3D[]): Object3D[] {
    const items: Object3D[] = [];
    objs.forEach((c) => {
      if (c.type === type) {
        items.push(c);
      }
      if (c.children.length > 0) {
        items.push(...this.getObjectsByType(type, c.children));
      }
    });
    return items;
  }
  public showByType(type: string): void {
    this.showByIds(this.getObjectsByType(type, this.children).map((o) => o.id));
  }
  public hideByType(type: string): void {
    this.hideByIds(this.getObjectsByType(type, this.children).map((o) => o.id));
  }
  // ================== PRIVATE ====================
  private _countObjects(obj: Object3D): number {
    let z = 1;
    obj.children.forEach((c: Object3D) => {
      z += this._countObjects(c);
    });
    return z;
  }
  private _addObjectToClickables(obj: Object3D): void {
    if (obj.userData.clickable && this._clickables.indexOf(obj) === -1) {
      this._clickables.push(obj);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._addObjectToClickables(c);
      });
    }
  }
  private _addObjectToTickables(obj: Object3D): void {
    if (obj.userData.tickable && this._tickables.indexOf(obj) === -1) {
      this._tickables.push(obj);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._addObjectToTickables(c);
      });
    }
  }
  private _addObjectToCleanables(obj: Object3D): void {
    if (obj.userData.cleanable && this._cleanables.indexOf(obj) === -1) {
      this._cleanables.push(obj);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._addObjectToCleanables(c);
      });
    }
  }
  private _delObjectToClickables(obj: Object3D): void {
    if (obj.userData.clickable) {
      this._clickables.splice(this._clickables.indexOf(obj), 1);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._delObjectToClickables(c);
      });
    }
  }
  private _delObjectToTickables(obj: Object3D): void {
    if (obj.userData.tickable) {
      this._tickables.splice(this._tickables.indexOf(obj), 1);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._delObjectToTickables(c);
      });
    }
  }
  private _delObjectToCleanables(obj: Object3D): void {
    if (obj.userData.cleanable) {
      this._cleanables.splice(this._cleanables.indexOf(obj), 1);
    }
    if (obj.children.length > 0) {
      obj.children.forEach((c) => {
        this._delObjectToCleanables(c);
      });
    }
  }
}

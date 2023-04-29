import { CustomCube } from './customs/cube';
import { ITickable } from './shared';
import { ThreeDRendererWorld } from './world/world';

export class AppApi {
  //
  private _world: ThreeDRendererWorld;
  //
  constructor(world: ThreeDRendererWorld) {
    this._world = world;
  }
  //
  public buildCube(initActions?: ITickable): CustomCube {
    return new CustomCube(initActions);
  }
}

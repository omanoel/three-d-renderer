import { CustomCube } from './customs/cube';
import { CustomCubeOptions } from './customs/cube-options';
import { CustomSea } from './customs/sea';
import { CustomSeaOptions } from './customs/sea-options';
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
  public buildCube(
    initActions?: Partial<ITickable>,
    initOptions?: Partial<CustomCubeOptions>
  ): CustomCube {
    return new CustomCube(initActions, initOptions);
  }
  //
  public buildSea(
    initActions?: Partial<ITickable>,
    initOptions?: Partial<CustomSeaOptions>
  ): CustomSea {
    const distanceToCamera =
      this._world.threeDRendererBasics.threeDRendererControls.distanceToTarget;
    return new CustomSea(distanceToCamera, initActions, initOptions);
  }
}

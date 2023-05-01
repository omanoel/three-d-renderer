import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { IConfigurable, IOnlyTickable, ITickParams } from '../shared';
import { AbstractOnlyTickableGroup } from '../shared/abstract-xxxxxable-group';
import { CustomSeaOptions, DEFAULT_CUSTOM_SEA_OPTIONS } from './sea-options';

export class CustomSea
  extends AbstractOnlyTickableGroup<IOnlyTickable>
  implements IConfigurable<CustomSeaOptions>
{
  //
  public type: string;
  //
  private _originalDistanceToTarget: number;
  constructor(
    distanceToTarget: number,
    initActions?: Partial<IOnlyTickable>,
    initOptions?: Partial<CustomSeaOptions>
  ) {
    //
    super(initActions);
    //
    this.type = 'CustomSea';
    //
    this.userData.options = {
      ...DEFAULT_CUSTOM_SEA_OPTIONS,
      ...initOptions
    };
    this._originalDistanceToTarget = distanceToTarget;
    // create a geometry
    const geometry = new BoxGeometry(
      distanceToTarget,
      this.userData.options.waterHeight,
      distanceToTarget
    );
    const material = new MeshPhongMaterial({
      color: '#3581b1',
      opacity: 0.5,
      transparent: true,
      specular: 'white',
      shininess: 35
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.position.set(0, -this.userData.options.waterHeight / 2, 0);
    this.add(cube);
    // override onTick
    this.userData.onTick = this.tick.bind(this);
  }
  public updateWithOptions(options: Partial<CustomSeaOptions>): void {
    if (options.waterHeight !== undefined) {
      this.userData.options.waterHeight = options.waterHeight;
    }
  }
  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params);
  }

  private _update(params: ITickParams): void {
    const ratio = params.distance / this._originalDistanceToTarget;
    this._resize(ratio);
  }

  private _resize(ratio: number): void {
    this.scale.set(ratio, 1, ratio);
  }
}

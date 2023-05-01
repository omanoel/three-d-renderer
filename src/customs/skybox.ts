import {
  BackSide,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader
} from 'three';
import { AbstractOnlyTickableGroup, ITickParams, ITickable } from '../shared';

export class ThreeDRendererSkybox extends AbstractOnlyTickableGroup<ITickable> {
  //
  public type: string;
  //
  private _originalZoomDistance: number;
  //
  constructor(distanceFromCameraToTarget: number) {
    //
    super();
    //
    this.type = 'ThreeDRendererSkybox';
    //
    this._originalZoomDistance = distanceFromCameraToTarget;
    this._build();
    this.userData.options = {};
    this.userData.onTick = this.tick.bind(this);
  }

  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params);
  }

  private _build(): void {
    let materialArray = [];
    let texture_ft = new TextureLoader().load(
      '../assets/textures/ocean/front.jpg'
    );
    let texture_bk = new TextureLoader().load(
      '../assets/textures/ocean/back.jpg'
    );
    let texture_up = new TextureLoader().load(
      '../assets/textures/ocean/top.jpg'
    );
    let texture_dn = new TextureLoader().load(
      '../assets/textures/ocean/bottom.jpg'
    );
    let texture_rt = new TextureLoader().load(
      '../assets/textures/ocean/right.jpg'
    );
    let texture_lf = new TextureLoader().load(
      '../assets/textures/ocean/left.jpg'
    );

    materialArray.push(new MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) materialArray[i].side = BackSide;

    let skyboxGeo = new BoxGeometry(50000, 50000, 50000);
    let skybox = new Mesh(skyboxGeo, materialArray);
    skybox.rotateX(Math.PI / 2);
    this.add(skybox);
  }

  private _update(params: ITickParams): void {
    this.position.set(
      params.targetPos.x,
      params.targetPos.y,
      params.targetPos.z
    );
    const ratio = params.distance / this._originalZoomDistance;
    this._resize(ratio);
  }

  private _resize(ratio: number): void {
    if (this._ratioNeedUpdated(ratio)) {
      this.scale.setScalar(ratio);
    }
  }

  private _ratioNeedUpdated(ratio: number): boolean {
    return this._roundValue(ratio) !== this._roundValue(this.scale.x);
  }

  private _roundValue(value: number): number {
    return Math.round(value);
  }
}

import { Group, PlaneGeometry } from 'three';
import { Water, WaterOptions } from 'three/examples/jsm/objects/Water';

export class CustomWater extends Group {
  constructor() {
    //
    super();
    //
    this._build();
    this.userData.options = {};
  }

  private _build(): void {
    const geometry = new PlaneGeometry(200, 200);
    const options: WaterOptions = {
      waterColor: 'lightblue',
      textureWidth: 1024,
      textureHeight: 1024,
      fog: false
    };
    const water = new Water(geometry, options);
    water.rotation.x = Math.PI * -0.5;
    this.add(water);
  }
}

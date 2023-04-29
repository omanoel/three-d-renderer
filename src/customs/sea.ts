import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import { ICleanable } from '../shared';
import { AbstractCleanableGroup } from '../shared/abstract-xxxxxable-group';

export class CustomSea extends AbstractCleanableGroup<ICleanable> {
  //

  constructor() {
    super();
    this.name = 'Cube';
    // create a geometry
    const geometry = new BoxGeometry(20, 20, 2);
    const material = new MeshLambertMaterial({
      color: 'lightblue',
      opacity: 0.3,
      transparent: true
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.position.set(0, 0, -1);
    this.add(cube);
  }
}

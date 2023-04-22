import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import { AbstractCleanableGroup } from '../shared/abstract-xxxxxable-group';

export class ComponentGround extends AbstractCleanableGroup {
  //

  constructor() {
    super();
    this.name = 'Cube';
    // create a geometry
    const geometry = new BoxGeometry(20, 20, 10);
    const material = new MeshLambertMaterial({
      color: 'brown',
      opacity: 0.5,
      transparent: true,
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.position.set(0, 0, -7);
    this.add(cube);
  }
}

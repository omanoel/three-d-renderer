import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { AbstractTickableGroup } from '../shared/abstract-xxxxxable-group';

export class ComponentCube extends AbstractTickableGroup {
  constructor() {
    super();
    this.name = 'Cube';
    // create a geometry
    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshPhongMaterial({
      color: 'lightblue',
      transparent: true,
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    // cube.rotation.set(0.2, 0.5, 0.6);
    cube.position.set(400, 0, 0);
    this.add(cube);
  }

  //
  public tick(_delta: number): void {
    // specific behavior for update
  }
  public onMouseOver(): void {
    // specific behavior for update
    // (this.children[0] as any).material.wireframe = true;
  }
  public onMouseOut(): void {
    // specific behavior for update
    // (this.children[0] as any).material.wireframe = false;
  }
  public onMouseDblClick(): void {
    // specific behavior for update;
  }
}

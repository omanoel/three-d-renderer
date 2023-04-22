import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from 'three';
import { ICleanable } from '../shared/interfaces/i-cleanable';
import { IClickable } from '../shared/interfaces/i-clickable';
import { ITickable } from '../shared/interfaces/i-tickable';
import { ComponentCubeEvent } from './cube-options';

export class ComponentCube
  extends Group
  implements IClickable<ComponentCubeEvent>, ITickable, ICleanable
{
  //
  public cleanable: true;
  public tickable: true;

  constructor() {
    super();
    this.cleanable = true;
    this.tickable = true;
    this.name = 'Cube';
    this.userData = {
      onMouseOver: this.onMouseOver.bind(this),
      onMouseOut: this.onMouseOut.bind(this),
      cleanable: true,
    };
    // create a geometry
    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshPhongMaterial({
      color: 'lightblue',
      transparent: true,
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    // cube.rotation.set(0.2, 0.5, 0.6);
    cube.position.set(-500, 0, 0);
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
  public onMouseClick(_event: ComponentCubeEvent): void {
    // specific behavior for update
  }
}

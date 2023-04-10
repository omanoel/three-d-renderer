import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import { AbstractClickable } from '../abstracts/abstract-clickable';

export class ExpandedCube extends AbstractClickable {
  //
  private _cube: Mesh;
  //
  constructor() {
    super();
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);

    // create a default (white) Basic material
    // const material = new MeshBasicMaterial();
    // Switch the old "basic" material to
    // a physically correct "standard" material
    const material = new MeshStandardMaterial({ color: 'purple' });

    // create a Mesh containing the geometry and material
    this._cube = new Mesh(geometry, material);

    this._cube.rotation.set(-0.5, -0.1, 0.8);
  }
  //
  public get cube(): Mesh {
    return this._cube;
  }

  //
  public tick(_delta: number): void {
    // specific behavior for update
  }
  public onMouseOver(): void {
    throw new Error('Method not implemented.');
  }
  public onMouseOut(): void {
    throw new Error('Method not implemented.');
  }
  public onMouseEnter(): void {
    throw new Error('Method not implemented.');
  }
  public onMouseLeave(): void {
    throw new Error('Method not implemented.');
  }
  public onMouseClick(): void {
    throw new Error('Method not implemented.');
  }
}

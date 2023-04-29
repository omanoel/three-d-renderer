import { BoxGeometry, Mesh, MeshPhongMaterial, Object3D } from 'three';
import { AbstractTickableGroup } from '../shared/abstract-xxxxxable-group';
import { ITickable } from '../shared/interfaces';

export class CustomCube extends AbstractTickableGroup<ITickable> {
  public type: string;
  constructor(initActions?: Partial<ITickable>) {
    super(initActions);
    this.type = 'CustomCube';
    // create a geometry
    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshPhongMaterial({
      color: 'lightblue',
      transparent: true,
      wireframe: false
    });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    // cube.rotation.set(0.2, 0.5, 0.6);
    cube.position.set(400, 0, 0);
    this.add(cube);
    if (initActions?.onMouseOver) {
      this.userData.onMouseOver = this._internalHandlerForMouseOver.bind(
        this,
        initActions?.onMouseOver
      );
    } else {
      this.userData.onMouseOver = this._internalHandlerForMouseOver.bind(this);
    }
    if (initActions?.onMouseOut) {
      this.userData.onMouseOut = this._internalHandlerForMouseOut.bind(
        this,
        initActions?.onMouseOut
      );
    } else {
      this.userData.onMouseOver = this._internalHandlerForMouseOut.bind(this);
    }
  }
  private _internalHandlerForMouseOver(
    _externalHandlerForMouseOver: (event: Event, object: Object3D) => void,
    myEvent: Event,
    myObject: Object3D
  ): void {
    (myObject.children[0] as any).material.wireframe = true;
    if (_externalHandlerForMouseOver !== undefined) {
      _externalHandlerForMouseOver(myEvent, myObject);
    }
  }
  private _internalHandlerForMouseOut(
    _externalHandlerForMouseOut: (event: Event, object: Object3D) => void,
    myEvent: Event,
    myObject: Object3D
  ): void {
    (myObject.children[0] as any).material.wireframe = false;
    if (_externalHandlerForMouseOut !== undefined) {
      _externalHandlerForMouseOut(myEvent, myObject);
    }
  }
}

import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AbstractTickable } from '../abstracts/abstract-tickable';

export class ExpandedControls extends AbstractTickable {
  private _controls: OrbitControls;
  //
  constructor(camera: PerspectiveCamera, container: HTMLDivElement) {
    super();
    //
    this._controls = new OrbitControls(camera, container);
    // this._controls.enableDamping = true;
    this._controls.addEventListener('change', () => this.handleChange());
    container.ownerDocument.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this.handleKeyDown(event)
    );
  }

  public get controls(): OrbitControls {
    return this._controls;
  }

  public handleChange(): void {
    // can be called from ouside for specific behavior
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this._controls.reset();
    }
  }

  public tick(_delta: number): void {
    this._controls.update();
  }
}

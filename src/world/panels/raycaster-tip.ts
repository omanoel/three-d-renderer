import { Intersection, Object3D } from 'three';

export class ThreeDRendererRaycasterTip {
  //
  private _panel: HTMLDivElement;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(domContainer: HTMLDivElement) {
    //
    this._panel = this._createPanel(domContainer);
  }

  // =======================================
  // GETTER
  // =======================================
  public get panel(): HTMLDivElement {
    return this._panel;
  }

  // =======================================
  // PUBLIC
  // =======================================
  public display(intersected: Intersection<Object3D>): void {
    const message =
      'RayCaster intersects object named ' +
      '<b>' +
      intersected.object.name +
      '</b>' +
      ' at coordinates : <br>' +
      intersected.point.x +
      '/' +
      intersected.point.y +
      '/' +
      intersected.point.z;
    this._panel.innerHTML = message;
    this._panel.style.visibility = 'visible';
  }
  public hide(): void {
    this._panel.style.visibility = 'hidden';
    this._panel.innerHTML = '';
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _createPanel(domContainer: HTMLDivElement): HTMLDivElement {
    const panel = domContainer.ownerDocument.createElement('div');
    panel.setAttribute(
      'style',
      `position: absolute;
      top: 160px;
      z-index: 100;
      display: block;
      background: white;`
    );
    panel.innerHTML = '';
    domContainer.appendChild(panel);
    return panel;
  }
}

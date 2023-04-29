import Stats from 'three/examples/jsm/libs/stats.module';

export class ThreeDRendererStats {
  //
  private _panel: Stats;
  //
  constructor(domContainer: HTMLDivElement) {
    this._panel = new Stats();
    domContainer.appendChild(this._panel.dom);
  }
  //
  public get panel(): Stats {
    return this._panel;
  }
}

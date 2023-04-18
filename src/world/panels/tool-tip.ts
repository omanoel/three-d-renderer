export class ThreeDRendererToolTip {
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
  public display(message: string): void {
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
      top: 60px;
      z-index: 1000;
      display: block;
      background: gray;`
    );
    panel.innerHTML = '';
    domContainer.appendChild(panel);
    return panel;
  }
}

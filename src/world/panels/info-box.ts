export class InfoBox {
  //
  private _infoBox: HTMLDivElement;
  //
  constructor(container: HTMLDivElement, id: string) {
    //
    this._infoBox = container.ownerDocument.createElement('div');
    this._infoBox.setAttribute(
      'style',
      `position: absolute;
      top: 60px;
      left: 5px;
      z-index: 100;
      display: block;
      background: white;`
    );
    this._infoBox.setAttribute('id', id);
    this._infoBox.innerHTML = '';
    container.appendChild(this._infoBox);
  }
  //
  public get infoBox(): HTMLDivElement {
    return this._infoBox;
  }

  public setInnerHtml(message: string): void {
    this._infoBox.innerHTML = message;
  }
}

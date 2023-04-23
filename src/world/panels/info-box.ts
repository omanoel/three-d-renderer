import { Vector3 } from 'three';
import { GetOptionValueUtil } from '../../shared/utils/get-option-value-util';
import './info-box.css';

export class InfoBox {
  //
  private _infoBox: HTMLDivElement;
  private _messages: Map<string, string> = new Map();
  //
  constructor(container: HTMLDivElement) {
    //
    this._infoBox = container.ownerDocument.createElement('div');
    this._infoBox.setAttribute('class', 'three-d-renderer-info-box');
    container.appendChild(this._infoBox);
  }
  //
  public get infoBox(): HTMLDivElement {
    return this._infoBox;
  }
  public addMessage(id: string, message: string): void {
    this._messages.set(id, message);
    this._setInnerHtml();
  }
  public removeMessage(id: string): void {
    this._messages.delete(id);
    this._setInnerHtml();
  }
  public removeMessages(): void {
    this._messages.clear();
    this._setInnerHtml();
  }
  public addMessagePosition(id: string, message: string, pos: Vector3): void {
    const messagePos =
      ': (' +
      GetOptionValueUtil.getFixedValue(pos.x) +
      ',' +
      GetOptionValueUtil.getFixedValue(pos.y) +
      ',' +
      GetOptionValueUtil.getFixedValue(pos.z) +
      ')';
    this._messages.set(id, message + messagePos);
    this._setInnerHtml();
  }
  private _setInnerHtml(): void {
    this._infoBox.innerHTML = this._buildMessage();
  }
  private _buildMessage(): string {
    let message = '';
    this._messages.forEach((v) => {
      message += '<p>' + v + '</p>';
    });
    return message;
  }
}

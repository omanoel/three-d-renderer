import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  DEFAULT_DIALOG_BOX_OPTIONS,
  ThreeDRendererDialogBoxOptions,
} from './dialog-box-options';
import './dialog-box.css';

export class ThreeDRendererDialogBox
  implements IConfigurable<ThreeDRendererDialogBoxOptions>
{
  private static HTML_ID_PREFIX = 'three-d-renderer-dialog-box';
  private static HTML_TITLE_SUFFIX = '-title';
  private static HTML_MESSAGE_SUFFIX = '-message';
  private static HTML_CLOSE_BTN_SUFFIX = '-close-btn';
  private _panel: HTMLDivElement;
  private _options: ThreeDRendererDialogBoxOptions;
  private _id: string;

  /**
   * Constructor
   * @param domContainer The parent HTML element
   */
  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererDialogBoxOptions>
  ) {
    const options = {
      ...DEFAULT_DIALOG_BOX_OPTIONS,
      ...initOptions,
    };
    this._options = options;
    this._panel = domContainer.ownerDocument.createElement('div');
    this._id = ThreeDRendererDialogBox.HTML_ID_PREFIX + '-' + this._options.id;
    this._panel.setAttribute('id', this._id);
    this._panel.setAttribute('class', ThreeDRendererDialogBox.HTML_ID_PREFIX);
    domContainer.appendChild(this._panel);
    this._panel.style.visibility = 'hidden';

    this._addTitle(this._options.title);
    this._addMessage(this._options.message);
    this._addCloseButton();
  }

  /**
   * Method to show the dialog box.
   */
  public show(): void {
    this._panel.style.visibility = 'visible';
  }

  /**
   * Method to hide the dialog box.
   */
  public hide(): void {
    this._panel.style.visibility = 'hidden';
  }

  /**
   * Set with dialog box options.
   * @param dialogBoxOptions the dialog box options
   */
  public updateWithOptions(
    dialogBoxOptions: Partial<ThreeDRendererDialogBoxOptions>
  ) {
    if (dialogBoxOptions.title !== undefined) {
      this._setInnerHtml(this.titleId, dialogBoxOptions.title);
    }
    if (dialogBoxOptions.message !== undefined) {
      this._setInnerHtml(this.messageId, dialogBoxOptions.message);
    }
  }

  /**
   * Get the HTML element of panel.
   * @returns the panel container
   */
  public get panel(): HTMLDivElement {
    return this._panel;
  }

  private _setInnerHtml(elementID: string, value: string): void {
    const element: HTMLElement | null =
      this._panel.ownerDocument.getElementById(elementID);

    if (element !== null) {
      element.innerHTML = value;
    }
  }

  private _addTitle(title: string): void {
    const htmlElement: HTMLHeadingElement =
      this._panel.ownerDocument.createElement('h2');
    htmlElement.setAttribute('id', this.titleId);
    this._panel.appendChild(htmlElement);
    this._setInnerHtml(this.titleId, title);
  }

  private _addMessage(message: string): void {
    const htmlElement: HTMLParagraphElement =
      this._panel.ownerDocument.createElement('p');
    htmlElement.setAttribute('id', this.messageId);
    this._panel.appendChild(htmlElement);
    this._setInnerHtml(this.messageId, message);
  }

  private _addCloseButton(): void {
    const htmlElement: HTMLButtonElement =
      this._panel.ownerDocument.createElement('button');
    htmlElement.setAttribute('id', this.closeBtnId);
    htmlElement.innerHTML = 'Close';
    this._panel.appendChild(htmlElement);
    const button = this._panel.ownerDocument.getElementById(this.closeBtnId);
    if (button !== null) {
      button.addEventListener('mousedown', (mouseEvent: MouseEvent) => {
        mouseEvent.preventDefault();
        const container: HTMLElement | null = button.parentElement;
        if (container) {
          container.style.visibility = 'hidden';
        }
        mouseEvent.stopPropagation();
      });
    }
  }

  private get titleId(): string {
    return (
      ThreeDRendererDialogBox.HTML_ID_PREFIX +
      ThreeDRendererDialogBox.HTML_TITLE_SUFFIX +
      '-' +
      this._options.id
    );
  }

  private get messageId(): string {
    return (
      ThreeDRendererDialogBox.HTML_ID_PREFIX +
      ThreeDRendererDialogBox.HTML_MESSAGE_SUFFIX +
      '-' +
      this._options.id
    );
  }

  private get closeBtnId(): string {
    return (
      ThreeDRendererDialogBox.HTML_ID_PREFIX +
      ThreeDRendererDialogBox.HTML_CLOSE_BTN_SUFFIX +
      '-' +
      this._options.id
    );
  }
}

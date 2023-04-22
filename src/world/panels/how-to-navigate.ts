import { ColorRepresentation } from 'three';

import { ThreeDRendererCssAbsolutePosition } from '../../shared/i-options';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  DEFAULT_HOWTONAVIGATE_OPTIONS,
  ThreeDRendererHowToNavigateOptions,
} from './how-to-navigate-options';

export class ThreeDRendererHowToNavigate
  implements IConfigurable<ThreeDRendererHowToNavigateOptions>
{
  public static HOW_TO_NAVIGATE_ID = 'how-to-navigate';

  private static TEXT_FIELD_ID = 'TextField';
  private static TITLE_ID = 'title';
  private static TITLE_CONTENT = 'How to use 3D display?';

  private _panel: HTMLDivElement;

  /**
   * Constructor
   * @param domContainer The parent HTML element
   */
  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererHowToNavigateOptions>
  ) {
    const options = {
      ...DEFAULT_HOWTONAVIGATE_OPTIONS,
      ...initOptions,
    };
    this._panel = domContainer.ownerDocument.createElement('div');
    this._panel.setAttribute(
      'id',
      ThreeDRendererHowToNavigate.HOW_TO_NAVIGATE_ID
    );
    domContainer.appendChild(this._panel);
    this._panel.style.position = 'absolute';
    this._panel.style.zIndex = '100';
    this._panel.style.backgroundColor = 'rgba(120, 120, 120, 0.4)';
    this._panel.style.boxShadow = '10px 5px 5px rgba(70, 70, 70, 0.4)';
    this._panel.style.width = '600px';
    this._panel.style.height = '300px';
    this._panel.style.border = '3px solid black';
    this._panel.style.textAlign = 'center';
    this._panel.style.visibility = 'hidden';

    this._addTitle();
    this._addTextField();
    this._addCloseButtons();
    this.updateWithOptions(options);
  }

  /**
   * Get the HTML element container.
   * @returns the main container
   */
  public get panel(): HTMLDivElement {
    return this._panel;
  }

  /**
   * Method to show the helper.
   */
  public show(): void {
    this._panel.style.visibility = 'visible';
  }

  /**
   * Method to show the helper.
   */
  public hide(): void {
    this._panel.style.visibility = 'hidden';
  }

  /**
   * Set the HowToNavigate options.
   * @param howToNavigateOptions the HowToNavigate options
   */
  public updateWithOptions(
    howToNavigateOptions: Partial<ThreeDRendererHowToNavigateOptions>
  ) {
    if (howToNavigateOptions.titleColor !== undefined) {
      this._setProperty(
        ThreeDRendererHowToNavigate.TITLE_ID,
        'color',
        howToNavigateOptions.titleColor
      );
    }
    if (howToNavigateOptions.textColor !== undefined) {
      this._setProperty(
        ThreeDRendererHowToNavigate.TEXT_FIELD_ID,
        'color',
        howToNavigateOptions.textColor
      );
    }
    if (howToNavigateOptions.opacity !== undefined) {
      this._setProperty(
        ThreeDRendererHowToNavigate.HOW_TO_NAVIGATE_ID,
        'opacity',
        howToNavigateOptions.opacity
      );
    }
    if (howToNavigateOptions.textContent !== undefined) {
      this._setInnerHtml(
        ThreeDRendererHowToNavigate.TEXT_FIELD_ID,
        howToNavigateOptions.textContent
      );
    }
    if (howToNavigateOptions.absolutePosition !== undefined) {
      this._setLocation(howToNavigateOptions.absolutePosition);
    }
  }

  private _setLocation(location: ThreeDRendererCssAbsolutePosition): void {
    let leftLocation: number = location.left;
    let topLocation: number = location.top;

    if (this._panel.parentElement !== null) {
      leftLocation += this._panel.parentElement.getBoundingClientRect().left;
      topLocation += this._panel.parentElement.getBoundingClientRect().top;
    }
    this._panel.style.top = topLocation.toString() + 'px';
    this._panel.style.left = leftLocation.toString() + 'px';
  }

  private _setProperty(
    elementID: string,
    property: string,
    value?: ColorRepresentation | string | number
  ): void {
    if (value != undefined) {
      const element: HTMLElement | null =
        this._panel.ownerDocument.getElementById(elementID);
      if (element) {
        element.style.setProperty(property, value.toString());
      }
    }
  }

  private _getProperty(elementID: string, property: string): string {
    let value = '';
    const element: HTMLElement | null =
      this._panel.ownerDocument.getElementById(elementID);
    if (element != null) {
      alert('_getProperty = ' + element.style.top);
      value = element.style.getPropertyValue(property);
    }

    return value;
  }

  private _setInnerHtml(elementID: string, value?: string): void {
    if (value != undefined) {
      const element: HTMLElement | null =
        this._panel.ownerDocument.getElementById(elementID);

      if (element != null) {
        element.innerHTML = value;
      }
    }
  }

  private _addTitle(): void {
    const title: HTMLDivElement = this._panel.ownerDocument.createElement('h2');
    title.setAttribute('id', ThreeDRendererHowToNavigate.TITLE_ID);
    title.style.textAlign = 'center';
    title.style.color = 'rgb(0,0,0)';
    title.style.verticalAlign = 'middle';
    title.style.lineHeight = '10px';

    title.innerHTML = ThreeDRendererHowToNavigate.TITLE_CONTENT;
    this._panel.appendChild(title);
  }

  private _addTextField(): void {
    const labelContainer: HTMLDivElement =
      this._panel.ownerDocument.createElement('div');
    labelContainer.style.backgroundColor = 'transparent';
    labelContainer.style.width = '600px';
    labelContainer.style.height = '220px';
    labelContainer.style.display = 'flex';
    labelContainer.style.display = 'flex';
    labelContainer.style.justifyContent = 'center';
    labelContainer.style.flexDirection = 'column';
    labelContainer.style.textAlign = 'center';

    const label: HTMLSpanElement =
      this._panel.ownerDocument.createElement('span');
    label.setAttribute('id', ThreeDRendererHowToNavigate.TEXT_FIELD_ID);
    label.style.color = 'rgb(200, 200, 200)';
    label.style.verticalAlign = 'middle';
    label.style.textAlign = 'center';
    label.style.lineHeight = '30px';
    labelContainer.appendChild(label);

    // add labelContainer in main container
    this._panel.appendChild(labelContainer);
  }

  private _addCloseButtons(): void {
    const buttonCross = this._createButton('close-cross');
    buttonCross.style.width = '20px';
    buttonCross.style.height = '20px';
    buttonCross.style.maxWidth = '20px';
    buttonCross.style.maxHeight = '20px';
    buttonCross.style.position = 'absolute';
    buttonCross.style.marginTop = '1px';
    buttonCross.style.marginRight = '2px';
    buttonCross.style.top = '0';
    buttonCross.style.right = '0';
    buttonCross.style.backgroundImage = 'url( /assets/images/close.png")';
    buttonCross.style.backgroundSize = '100% 100%';
    this._panel.appendChild(buttonCross);
    this._setListeners('close-cross');

    const buttonClose = this._createButton('close-text');
    buttonClose.innerHTML = 'Close';
    buttonClose.style.width = '50px';
    buttonClose.style.height = '25px';
    buttonClose.style.position = 'absolute';
    buttonClose.style.bottom = '5px';
    buttonClose.style.right = '8px';
    this._panel.appendChild(buttonClose);
    this._setListeners('close-text');
  }

  private _createButton(id: string): HTMLButtonElement {
    const button: HTMLButtonElement =
      this._panel.ownerDocument.createElement('button');
    button.setAttribute('id', id);
    button.style.border = 'none';
    button.style.color = 'white';
    button.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    button.style.textAlign = 'center';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'tahoma';
    button.style.fontSize = '15px';

    return button;
  }

  private _setListeners(id: string): void {
    const button = this._panel.ownerDocument.getElementById(id);
    if (button !== null) {
      button.addEventListener('mouseover', (mouseEvent: MouseEvent) => {
        button.style.backgroundColor = 'rgba(100, 100, 100, 0.5)';
        mouseEvent.stopPropagation();
      });
      button.addEventListener('mouseleave', (mouseEvent: MouseEvent) => {
        button.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        mouseEvent.stopPropagation();
      });
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
}

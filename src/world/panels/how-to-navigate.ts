import { ColorRepresentation } from 'three';

import {
  DEFAULT_HOWTONAVIGATE_OPTIONS,
  ThreeDRendererHowToNavigateOptions,
} from './how-to-navigate-options';
import { ThreeDRendererCssAbsolutePosition } from '../../shared/i-options';
import { IConfigurable } from '../../shared/interfaces/i-configurable';

export class ThreeDRendererHowToNavigate
  implements IConfigurable<ThreeDRendererHowToNavigateOptions>
{
  public static HOW_TO_NAVIGATE_ID = 'HowToNavigate';

  private static TEXT_FIELD_ID = 'TextField';
  private static TITLE_ID = 'Title';
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
    domContainer.appendChild(this._panel);
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
   * Set the HowToNavigate options.
   * @param howToNavigateOptions the HowToNavigate options
   */
  public updateWithOptions(
    howToNavigateOptions: Partial<ThreeDRendererHowToNavigateOptions>
  ) {
    if (howToNavigateOptions !== undefined) {
      this._setProperty(
        ThreeDRendererHowToNavigate.TITLE_ID,
        'color',
        howToNavigateOptions.titleColor
      );
      this._setProperty(
        ThreeDRendererHowToNavigate.TEXT_FIELD_ID,
        'color',
        howToNavigateOptions.textColor
      );
      this._setProperty(
        ThreeDRendererHowToNavigate.HOW_TO_NAVIGATE_ID,
        'opacity',
        howToNavigateOptions.opacity
      );

      this._setInnerHtml(
        ThreeDRendererHowToNavigate.TEXT_FIELD_ID,
        howToNavigateOptions.textContent
      );
      this._setLocation(
        ThreeDRendererHowToNavigate.HOW_TO_NAVIGATE_ID,
        howToNavigateOptions.absolutePosition
      );
    }
  }

  private _setLocation(
    elementID: string,
    location?: ThreeDRendererCssAbsolutePosition
  ): void {
    if (location != undefined) {
      const navigateHelper: HTMLElement | null =
        this._panel.ownerDocument.getElementById(
          ThreeDRendererHowToNavigate.HOW_TO_NAVIGATE_ID
        );
      if (navigateHelper != null) {
        const parent: HTMLElement | null = navigateHelper.parentElement;
        let leftLocation: number = location.left;
        let topLocation: number = location.top;

        if (parent != null) {
          leftLocation += parent.getBoundingClientRect().left;
          topLocation += parent.getBoundingClientRect().top;
        }

        this._setProperty(elementID, 'left', leftLocation.toString() + 'px');
        this._setProperty(elementID, 'top', topLocation.toString() + 'px');
      }
    }
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
    title.style.color = 'rgb(105, 240, 174)';
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
    const buttonCross = this._createButton();
    buttonCross.style.width = '20px';
    buttonCross.style.height = '20px';
    buttonCross.style.maxWidth = '20px';
    buttonCross.style.maxHeight = '20px';
    buttonCross.style.position = 'absolute';
    buttonCross.style.marginTop = '1px';
    buttonCross.style.marginRight = '2px';
    buttonCross.style.top = '0';
    buttonCross.style.right = '0';
    buttonCross.style.backgroundImage =
      'url("example/assets/images/close.png")';
    buttonCross.style.backgroundSize = '100% 100%';

    const buttonClose = this._createButton();
    buttonClose.innerHTML = 'Close';
    buttonClose.style.width = '50px';
    buttonClose.style.height = '25px';
    buttonClose.style.position = 'absolute';
    buttonClose.style.bottom = '5px';
    buttonClose.style.right = '8px';

    this._panel.appendChild(buttonCross);
    this._panel.appendChild(buttonClose);
  }

  private _createButton(): HTMLButtonElement {
    const button: HTMLButtonElement =
      this._panel.ownerDocument.createElement('button');

    button.style.border = 'none';
    button.style.color = 'white';
    button.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    button.style.textAlign = 'center';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'tahoma';
    button.style.fontSize = '15px';

    button.addEventListener('mouseover', function handleMouseOver() {
      this.style.backgroundColor = 'rgba(100, 100, 100, 0.5)';
    });
    button.addEventListener('mouseleave', function handleMouseLeave() {
      this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });

    button.addEventListener('click', function handleClick() {
      const container: HTMLElement | null = this.parentElement;
      if (container) {
        container.style.visibility = 'hidden';
      }
    });

    return button;
  }
}

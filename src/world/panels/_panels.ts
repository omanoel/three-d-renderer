import { IConfigurable } from '../../shared/interfaces';
import {
  DEFAULT_PANELS_OPTIONS,
  ThreeDRendererPanelsOptions
} from './_panels-options';
import { ThreeDRendererDialogBoxUtil } from './dailog-box-util';
import { ThreeDRendererDialogBox } from './dialog-box';
import {
  DEFAULT_HOWTONAVIGATE_OPTIONS,
  ThreeDRendererDialogBoxOptions
} from './dialog-box-options';

export class ThreeDRendererPanels
  implements IConfigurable<ThreeDRendererPanelsOptions>
{
  private _dialogBoxUtil: ThreeDRendererDialogBoxUtil;
  private _defaultDialogBox: ThreeDRendererDialogBox;
  private _howToNavigateDialogBox: ThreeDRendererDialogBox;

  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererPanelsOptions>
  ) {
    const options = {
      ...DEFAULT_PANELS_OPTIONS,
      ...initOptions
    };
    this._dialogBoxUtil = new ThreeDRendererDialogBoxUtil();
    this._defaultDialogBox = this.addDialogBox(domContainer, options.default);
    this._howToNavigateDialogBox = this.addDialogBox(
      domContainer,
      options.howToNavigate
    );
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererPanelsOptions>
  ): void {
    if (options.default !== undefined) {
      this._defaultDialogBox.updateWithOptions(options.default);
    }
    if (options.howToNavigate !== undefined) {
      this._howToNavigateDialogBox.updateWithOptions(options.howToNavigate);
    }
  }

  public addDialogBox(
    domContainer: HTMLDivElement,
    options: ThreeDRendererDialogBoxOptions
  ): ThreeDRendererDialogBox {
    return this._dialogBoxUtil.add(domContainer, options);
  }

  public showDialogBox(id: string): void {
    this._dialogBoxUtil.show(id);
  }

  public hideDialogBox(id: string): void {
    this._dialogBoxUtil.hide(id);
  }

  public removeDialogBox(id: string): void {
    this._dialogBoxUtil.del(id);
  }

  public showHowToNavigateDialogBox(): void {
    this._dialogBoxUtil.show(DEFAULT_HOWTONAVIGATE_OPTIONS.id);
  }

  // =======================================
  // GETTER
  // =======================================
  public get howToNavigateDialogBox(): ThreeDRendererDialogBox {
    return this._howToNavigateDialogBox;
  }
}

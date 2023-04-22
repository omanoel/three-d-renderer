import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  DEFAULT_PANELS_OPTIONS,
  ThreeDRendererPanelsOptions,
} from './_panels-options';
import { ThreeDRendererHowToNavigate } from './how-to-navigate';

export class ThreeDRendererPanels
  implements IConfigurable<ThreeDRendererPanelsOptions>
{
  private _threeDRendererHowToNavigate: ThreeDRendererHowToNavigate;

  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererPanelsOptions>
  ) {
    const options = {
      ...DEFAULT_PANELS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererHowToNavigate = new ThreeDRendererHowToNavigate(
      domContainer,
      options.howToNavigate
    );
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererPanelsOptions>
  ): void {
    if (options.howToNavigate !== undefined) {
      this._threeDRendererHowToNavigate.updateWithOptions(
        options.howToNavigate
      );
    }
  }

  public showHowToNavigate(): void {
    this._threeDRendererHowToNavigate.show();
  }

  // =======================================
  // GETTER
  // =======================================
  public get threeDRendererHowToNavigate(): ThreeDRendererHowToNavigate {
    return this._threeDRendererHowToNavigate;
  }
}

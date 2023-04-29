import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { AppApi } from './app-api';
import { AppOptions, DEFAULT_APP_OPTIONS } from './app-options';
import { ThreeDRendererWorld } from './world/world';
import { ThreeDRendererWorldApi } from './world/world-api';

export class App {
  //
  private _world: ThreeDRendererWorld | undefined;
  private _api: AppApi | undefined;
  //
  constructor(domContainer: HTMLDivElement, initOptions?: Partial<AppOptions>) {
    const options = {
      ...DEFAULT_APP_OPTIONS,
      ...initOptions
    };
    if (WebGL.isWebGLAvailable()) {
      this._world = new ThreeDRendererWorld(domContainer, options);
      this._api = new AppApi(this._world);
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      domContainer.appendChild(warning);
      return;
    }
  }
  //
  public render(): void {
    this._world?.render();
  }
  //
  public get worldApi(): ThreeDRendererWorldApi | undefined {
    return this._world?.api;
  }
  //
  public get appApi(): AppApi | undefined {
    return this._api;
  }
}

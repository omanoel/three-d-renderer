import { IConfigurable } from '../../shared/interfaces';
import {
  DEFAULT_COMPONENTS_OPTIONS,
  ThreeDRendererComponentsOptions
} from './_components-options';
import { ThreeDRendererAmbientLight } from './ambient-light';
import { ThreeDRendererDirectionalLight } from './directional-light';

export class ThreeDRendererComponents
  implements IConfigurable<ThreeDRendererComponentsOptions>
{
  private _threeDRendererAmbientLight: ThreeDRendererAmbientLight;
  private _threeDRendererDirectionalLight: ThreeDRendererDirectionalLight;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(initOptions?: Partial<ThreeDRendererComponentsOptions>) {
    const options = {
      ...DEFAULT_COMPONENTS_OPTIONS,
      ...initOptions
    };
    this._threeDRendererAmbientLight = new ThreeDRendererAmbientLight();
    this._threeDRendererDirectionalLight = new ThreeDRendererDirectionalLight();

    this.updateWithOptions(options);
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererComponentsOptions>
  ): void {
    if (options.ambientLight !== undefined) {
      this._threeDRendererAmbientLight.updateWithOptions(options.ambientLight);
    }
    if (options.directionalLight !== undefined) {
      this._threeDRendererDirectionalLight.updateWithOptions(
        options.directionalLight
      );
    }
  }

  // =======================================
  // GETTER
  // =======================================
  public get threeDRendererAmbientLight(): ThreeDRendererAmbientLight {
    return this._threeDRendererAmbientLight;
  }
  public get threeDRendererDirectionalLight(): ThreeDRendererDirectionalLight {
    return this._threeDRendererDirectionalLight;
  }
}

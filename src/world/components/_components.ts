import { Group } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import { ThreeDRendererAmbientLight } from './ambient-light';
import { ThreeDRendererDirectionalLight } from './directional-light';
import {
  ThreeDRendererComponentsOptions,
  DEFAULT_COMPONENTS_OPTIONS,
} from './_components-options';

export class ThreeDRendererComponents
  extends Group
  implements IConfigurable<ThreeDRendererComponentsOptions>
{
  private _threeDRendererAmbientLight: ThreeDRendererAmbientLight;
  private _threeDRendererDirectionalLight: ThreeDRendererDirectionalLight;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(initOptions?: Partial<ThreeDRendererComponentsOptions>) {
    super();
    const options = {
      ...DEFAULT_COMPONENTS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererAmbientLight = new ThreeDRendererAmbientLight();
    this._threeDRendererDirectionalLight = new ThreeDRendererDirectionalLight();

    this.updateWithOptions(options);
    this.add(this._threeDRendererAmbientLight);
    this.add(this._threeDRendererDirectionalLight);
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

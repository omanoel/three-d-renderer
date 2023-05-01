import { ThreeDRendererSkybox } from '../../customs/skybox';
import { IConfigurable } from '../../shared/interfaces';
import { ThreeDRendererControls } from '../basics';
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
  private _threeDRendererSkybox: ThreeDRendererSkybox;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    threeDRendererControls: ThreeDRendererControls,
    initOptions?: Partial<ThreeDRendererComponentsOptions>
  ) {
    const options = {
      ...DEFAULT_COMPONENTS_OPTIONS,
      ...initOptions
    };
    this._threeDRendererAmbientLight = new ThreeDRendererAmbientLight();
    this._threeDRendererDirectionalLight = new ThreeDRendererDirectionalLight();
    this._threeDRendererSkybox = new ThreeDRendererSkybox(
      threeDRendererControls.distanceToTarget
    );

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
  public get threeDRendererSkybox(): ThreeDRendererSkybox {
    return this._threeDRendererSkybox;
  }
}

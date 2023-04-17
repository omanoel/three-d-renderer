import { Group } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  DEFAULT_AMBIENT_LIGHT_OPTIONS,
  ThreeDRendererAmbientLight,
  ThreeDRendererAmbientLightOptions,
} from "./ambient-light";
import {
  DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
  ThreeDRendererDirectionalLight,
  ThreeDRendererDirectionalLightOptions,
} from "./directional-light";

export interface ThreeDRendererComponentsOptions {
  ambientLight: ThreeDRendererAmbientLightOptions;
  directionalLight: ThreeDRendererDirectionalLightOptions;
}

export const COMPONENTS_OPTIONS: ThreeDRendererComponentsOptions = {
  ambientLight: DEFAULT_AMBIENT_LIGHT_OPTIONS,
  directionalLight: DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
};

export class ThreeDRendererComponents
  extends Group
  implements IConfigurable<ThreeDRendererComponentsOptions>
{
  private _threeDRendererAmbientLight: ThreeDRendererAmbientLight;
  private _threeDRendererDirectionalLight: ThreeDRendererDirectionalLight;

  constructor(initOptions?: Partial<ThreeDRendererComponentsOptions>) {
    super();
    const options = {
      ...COMPONENTS_OPTIONS,
      ...initOptions,
    };
    this._threeDRendererAmbientLight = new ThreeDRendererAmbientLight();
    this._threeDRendererDirectionalLight = new ThreeDRendererDirectionalLight();
    this.updateWithOptions(options);
    this.add(this._threeDRendererAmbientLight);
    this.add(this._threeDRendererDirectionalLight);
  }

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
}

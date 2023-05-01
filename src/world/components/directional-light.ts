import { Color, DirectionalLight } from 'three';
import { IConfigurable } from '../../shared/interfaces';
import {
  DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
  ThreeDRendererDirectionalLightOptions
} from './directional-light-options';

export class ThreeDRendererDirectionalLight
  extends DirectionalLight
  implements IConfigurable<ThreeDRendererDirectionalLightOptions>
{
  //
  constructor(initOptions?: Partial<ThreeDRendererDirectionalLightOptions>) {
    //
    super();
    //
    this.userData.options = {
      ...DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
      ...initOptions
    };
    //
    this.color = this._colorFromUserData;
    this.intensity = this._intensityFromUserData;
    this.position.set(
      this.userData.options.position.x,
      this.userData.options.position.y,
      this.userData.options.position.z
    );
  }
  //

  public updateWithOptions(
    options: Partial<ThreeDRendererDirectionalLightOptions>
  ): void {
    if (options.color !== undefined) {
      this.userData.options.color = options.color;
      this.color = this._colorFromUserData;
    }
    if (options.intensity !== undefined) {
      this.userData.options.intensity = options.intensity;
      this.intensity = this._intensityFromUserData;
    }
    if (options.position !== undefined) {
      this.userData.options.position = options.position;
      this.position.set(
        this.userData.options.position.x,
        this.userData.options.position.y,
        this.userData.options.position.z
      );
    }
  }

  private get _colorFromUserData(): Color {
    return new Color(this.userData.options.color);
  }

  private get _intensityFromUserData(): number {
    return this.userData.options.intensity;
  }
}

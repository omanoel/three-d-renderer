import { Color, DirectionalLight } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  ThreeDRendererDirectionalLightOptions,
  DEFAULT_DIRECTIONAL_LIGHT_OPTIONS
} from './directional-light-options';

export class ThreeDRendererDirectionalLight
  extends DirectionalLight
  implements IConfigurable<ThreeDRendererDirectionalLightOptions>
{
  //
  constructor(initOptions?: Partial<ThreeDRendererDirectionalLightOptions>) {
    super();
    const options = {
      ...DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
      ...initOptions
    };
    this.updateWithOptions(options);
  }
  //

  public updateWithOptions(
    options: Partial<ThreeDRendererDirectionalLightOptions>
  ): void {
    if (options.color !== undefined) {
      this.color = new Color(options.color);
    }
    if (options.intensity !== undefined) {
      this.intensity = options.intensity;
    }
    if (options.position !== undefined) {
      this.position.set(
        options.position.x,
        options.position.y,
        options.position.z
      );
    }
  }
}

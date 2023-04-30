import { AmbientLight, Color } from 'three';
import { IConfigurable } from '../../shared/interfaces';
import {
  DEFAULT_AMBIENT_LIGHT_OPTIONS,
  ThreeDRendererAmbientLightOptions
} from './ambient-light-options';

export class ThreeDRendererAmbientLight
  extends AmbientLight
  implements IConfigurable<ThreeDRendererAmbientLightOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererAmbientLightOptions>) {
    //
    super();
    //
    this.userData.options = {
      ...DEFAULT_AMBIENT_LIGHT_OPTIONS,
      ...initOptions
    };
    //
    this.color = new Color(this.userData.options.color);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererAmbientLightOptions>
  ): void {
    if (options.color !== undefined) {
      this.userData.options.color = options.color;
      this.color = new Color(this.userData.options.color);
    }
  }
}

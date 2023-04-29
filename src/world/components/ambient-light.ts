import { AmbientLight, Color } from 'three';
import { IConfigurable } from '../../shared/interfaces/i-configurable';
import {
  ThreeDRendererAmbientLightOptions,
  DEFAULT_AMBIENT_LIGHT_OPTIONS
} from './ambient-light-options';

export class ThreeDRendererAmbientLight
  extends AmbientLight
  implements IConfigurable<ThreeDRendererAmbientLightOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererAmbientLightOptions>) {
    super();
    const options = {
      ...DEFAULT_AMBIENT_LIGHT_OPTIONS,
      ...initOptions
    };
    this.updateWithOptions(options);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererAmbientLightOptions>
  ): void {
    if (options.color !== undefined) {
      this.color = new Color(options.color);
    }
  }
}

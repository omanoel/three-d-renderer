import { AmbientLight, Color, ColorRepresentation } from "three";
import { IConfigurable } from "../../shared/i-configurable";

export interface ThreeDRendererAmbientLightOptions {
  color: ColorRepresentation;
  intensity: number;
}

export const DEFAULT_AMBIENT_LIGHT_OPTIONS: ThreeDRendererAmbientLightOptions =
  {
    color: "white",
    intensity: 0.2,
  };

export class ThreeDRendererAmbientLight
  extends AmbientLight
  implements IConfigurable<ThreeDRendererAmbientLightOptions>
{
  constructor(initOptions?: Partial<ThreeDRendererAmbientLightOptions>) {
    super();
    const options = {
      ...DEFAULT_AMBIENT_LIGHT_OPTIONS,
      ...initOptions,
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

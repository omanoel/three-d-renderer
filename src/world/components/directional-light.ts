import { Color, ColorRepresentation, DirectionalLight } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import { ThreeDRendererCameraPositionOptions } from "../../shared/position-options";

export interface ThreeDRendererDirectionalLightOptions {
  color: ColorRepresentation;
  intensity: number;
  position: ThreeDRendererCameraPositionOptions;
}

export const DEFAULT_DIRECTIONAL_LIGHT_OPTIONS: ThreeDRendererDirectionalLightOptions =
  {
    color: "white",
    intensity: 5,
    position: {
      x: 10,
      y: 10,
      z: 10,
    },
  };

export class ThreeDRendererDirectionalLight
  extends DirectionalLight
  implements IConfigurable<ThreeDRendererDirectionalLightOptions>
{
  //
  constructor(initOptions?: Partial<ThreeDRendererDirectionalLightOptions>) {
    super();
    const options = {
      ...DEFAULT_DIRECTIONAL_LIGHT_OPTIONS,
      ...initOptions,
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

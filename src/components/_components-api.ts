import { ThreeDRendererBasics } from '../world/basics/_basics';
import { ThreeDRendererHelpers } from '../world/helpers/_helpers';
import { ThreeDRendererPanels } from '../world/panels/_panels';
import { ThreeDRendererWorldApi } from '../world/world-api';
import { ThreeDRendererWorldOptions } from '../world/world-options';
import { ComponentCube } from './cube';

export class ComponentsApi extends ThreeDRendererWorldApi {
  constructor(
    worldOptions: ThreeDRendererWorldOptions,
    threeDRendererBasics: ThreeDRendererBasics,
    threeDRendererPanels: ThreeDRendererPanels,
    threeDRendererHelpers: ThreeDRendererHelpers
  ) {
    super(
      worldOptions,
      threeDRendererBasics,
      threeDRendererPanels,
      threeDRendererHelpers
    );
  }
  public addCube(): ComponentCube {
    return new ComponentCube();
  }
}

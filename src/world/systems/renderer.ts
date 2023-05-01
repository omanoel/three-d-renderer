import { WebGLRenderer } from 'three';
import { IConfigurable } from '../../shared/interfaces';

export interface ThreeDRendererRendererOptions {
  antialias: boolean;
}

export const DEFAULT_RENDERER_OPTIONS: ThreeDRendererRendererOptions = {
  antialias: true
};

export class ThreeDRendererRenderer
  extends WebGLRenderer
  implements IConfigurable<ThreeDRendererRendererOptions>
{
  constructor(
    domContainer: HTMLDivElement,
    _initOptions?: Partial<ThreeDRendererRendererOptions>
  ) {
    super({ antialias: true });
    // const options = {
    //   ...DEFAULT_RENDERER_OPTIONS,
    //   ...initOptions
    // };
    domContainer.append(this.domElement);
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererRendererOptions>
  ): void {
    if (options.antialias !== undefined) {
      // ???
    }
  }
}

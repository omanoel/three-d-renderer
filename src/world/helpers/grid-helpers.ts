import { ColorRepresentation, GridHelper, Group } from "three";
import { IConfigurable } from "../../shared/i-configurable";

export interface ThreeDRendererGridHelpersOptions {
  size: number;
  divisions: number;
  color: ColorRepresentation;
}

export const DEFAULT_GRID_HELPERS_OPTIONS: ThreeDRendererGridHelpersOptions = {
  size: 10,
  divisions: 10,
  color: "grey",
};

export class ThreeDRendererGridHelpers
  extends Group
  implements IConfigurable<ThreeDRendererGridHelpersOptions>
{
  private _baseGridHelper: GridHelper;

  constructor(initOptions?: Partial<ThreeDRendererGridHelpersOptions>) {
    super();
    const options = {
      ...DEFAULT_GRID_HELPERS_OPTIONS,
      ...initOptions,
    };
    this._baseGridHelper = new GridHelper(
      options.size,
      options.divisions,
      options.color
    );
    this._build();
  }

  public updateWithOptions(
    options: Partial<ThreeDRendererGridHelpersOptions>
  ): void {
    if (options.size !== undefined) {
      // this._baseGridHelper.size = options.size;
    }
  }

  private _build(): void {
    this.clear();
    const gridXY = this._baseGridHelper.clone();
    const gridYZ = this._baseGridHelper.clone();
    gridYZ.rotateX(Math.PI / 2);
    const gridXZ = this._baseGridHelper.clone();
    gridXZ.rotateZ(Math.PI / 2);
    this.add(gridXY, gridYZ, gridXZ);
  }
}

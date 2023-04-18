import { GridHelper, Group, Material } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  ThreeDRendererGridsHelperOptions,
  DEFAULT_GRIDS_HELPER_OPTIONS,
} from "./grids-helper-options";

export class ThreeDRendererGridsHelper
  extends Group
  implements IConfigurable<ThreeDRendererGridsHelperOptions>
{
  private _options: ThreeDRendererGridsHelperOptions;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(initOptions?: Partial<ThreeDRendererGridsHelperOptions>) {
    super();
    const options = {
      ...DEFAULT_GRIDS_HELPER_OPTIONS,
      ...initOptions,
    };
    this._options = options;
    this._build();
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererGridsHelperOptions>
  ): void {
    if (options.size !== undefined) {
      this._options.size = options.size;
    }
    this._build();
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _buildGridHelper(horizontalPlane: boolean): GridHelper {
    const gridHelper = new GridHelper(
      this._options.size,
      this._options.divisions,
      this._options.color
    );
    (gridHelper.material as Material).transparent = true;
    (gridHelper.material as Material).opacity = horizontalPlane ? 0.5 : 0.2;
    return gridHelper;
  }

  private _build(): void {
    this.clear();
    const gridXZ = this._buildGridHelper(false);
    const gridXY = this._buildGridHelper(true);
    gridXY.rotateX(Math.PI / 2);
    const gridYZ = this._buildGridHelper(false);
    gridYZ.rotateZ(Math.PI / 2);
    this.add(gridXY, gridYZ, gridXZ);
  }
}

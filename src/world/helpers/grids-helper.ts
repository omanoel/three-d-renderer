import {
  GridHelper,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from 'three';
import {
  TextGeometry,
  TextGeometryParameters
} from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { AbstractOnlyTickableGroup } from '../../shared/abstract-xxxxxable-group';
import { SharedAxisTypes } from '../../shared/i-options';
import { IConfigurable, ITickParams } from '../../shared/interfaces';
import { GetOptionValueUtil } from '../../shared/utils/get-option-value-util';
import { ITickable } from './../../shared/interfaces';
import {
  DEFAULT_GRIDS_HELPER_OPTIONS,
  GRIDS_HELPER_SIZES,
  ThreeDRendererGridsHelperOptions,
  ThreeDRendererGridsHelperPlaneOptions
} from './grids-helper-options';

export class ThreeDRendererGridsHelper
  extends AbstractOnlyTickableGroup<ITickable>
  implements IConfigurable<ThreeDRendererGridsHelperOptions>
{
  public type: string;

  private _options: ThreeDRendererGridsHelperOptions;
  private _font: Font;
  private _textParameter: TextGeometryParameters;
  private _textMaterial: MeshBasicMaterial;
  private _idGroupLabels: number | undefined;
  private _tickTargetPos: Vector3;

  // =======================================
  // CONSTRUCTOR
  // =======================================
  constructor(
    font: Font,
    distanceToTarget: number,
    cameraPosition: Vector3,
    initActions?: Partial<ITickable>,
    initOptions?: Partial<ThreeDRendererGridsHelperOptions>
  ) {
    super(initActions);
    const options = {
      ...DEFAULT_GRIDS_HELPER_OPTIONS,
      ...initOptions
    };
    this.type = 'ThreeDRendererGridsHelper';
    this._options = options;
    this._options.size = this._getSizeFromDistance(distanceToTarget);
    this._tickTargetPos = cameraPosition;
    this._font = font;
    this._textParameter = {
      font: this._font, // An instance of THREE.Font.
      size: 0.1, // Float. Size of the text. Default is 100.
      height: 0.05, // Float. Thickness to extrude text. Default is 50.
      // The lowest curveSegments is the fastest it is
      curveSegments: 1, // Integer. Number of points on the curves. Default is 12.
      bevelEnabled: false, // Boolean. Turn on bevel. Default is False.
      bevelThickness: 1, // Float. How deep into text bevel goes. Default is 10.
      bevelSize: 1, // Float. How far from text outline is bevel. Default is 8.
      bevelOffset: 0, // Float. How far from text outline bevel starts. Default is 0.
      bevelSegments: 1 // Integer. Number of bevel segments. Default is 3.
    };
    this._textMaterial = new MeshBasicMaterial({
      opacity: 0.4,
      transparent: true
    });
    this._buildGridsHelper();
    this._buildGridsHelperLabels();
    this._gridsHelperLabelsLookAt(cameraPosition);
    // override onTick
    this.userData.onTick = this.tick.bind(this);
  }

  // =======================================
  // PUBLIC
  // =======================================
  public updateWithOptions(
    options: Partial<ThreeDRendererGridsHelperOptions>
  ): void {
    if (options.xy !== undefined) {
      this._options.xy = options.xy;
      this._buildGridsHelper();
    }
    if (options.gridOrigin !== undefined) {
      this._options.gridOrigin = options.gridOrigin;
      this._buildGridsHelperLabels();
    }
  }

  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params.distance, this._tickTargetPos);
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _buildGridsHelper(): void {
    this.clear();
    if (this._options.xz.visible) {
      const gridXZ = this._buildGridHelper(this._options.xz);
      this.add(gridXZ);
    }
    if (this._options.xy.visible) {
      const gridXY = this._buildGridHelper(this._options.xy);
      gridXY.rotateX(Math.PI / 2);
      this.add(gridXY);
    }
    if (this._options.yz.visible) {
      const gridYZ = this._buildGridHelper(this._options.yz);
      gridYZ.rotateZ(Math.PI / 2);
      this.add(gridYZ);
    }
  }

  private _buildGridHelper(
    planeOptions: ThreeDRendererGridsHelperPlaneOptions
  ): GridHelper {
    const gridHelper = new GridHelper(
      this._options.size,
      this._options.divisions,
      planeOptions.color
    );
    (gridHelper.material as Material).transparent = true;
    (gridHelper.material as Material).opacity = planeOptions.opacity;
    return gridHelper;
  }

  private _buildGridsHelperLabels(): void {
    if (this._idGroupLabels !== undefined) {
      this.getObjectById(this._idGroupLabels)?.clear();
    }
    const groupLabels = new Group();
    this._idGroupLabels = groupLabels.id;
    this._textParameter.size = this._options.size / 100;
    this._textParameter.height = this._options.size / 200;
    for (let d = 1; d <= this._options.divisions / 2; d++) {
      if (this._options.xLabel.visible) {
        groupLabels.add(this._createLabel(d, 'x', this._options.xLabel.units));
        groupLabels.add(this._createLabel(-d, 'x', this._options.xLabel.units));
      }
      if (this._options.yLabel.visible) {
        groupLabels.add(this._createLabel(d, 'y', this._options.yLabel.units));
        groupLabels.add(this._createLabel(-d, 'y', this._options.yLabel.units));
      }
      if (this._options.zLabel.visible) {
        groupLabels.add(this._createLabel(d, 'z', this._options.zLabel.units));
        groupLabels.add(this._createLabel(-d, 'z', this._options.zLabel.units));
      }
    }
    this.add(groupLabels);
  }

  private _createLabel(
    value: number,
    axis: SharedAxisTypes,
    unit?: string
  ): Mesh {
    const labelPosText = GetOptionValueUtil.getFixedValue(
      this._options.gridOrigin[axis] +
        (value * this._options.size) / this._options.divisions
    );
    const textGeometry = new TextGeometry(
      labelPosText + (unit ? ' ' + unit : ''),
      this._textParameter
    );
    const mesh = new Mesh(textGeometry, this._textMaterial);
    if (axis === 'x') {
      mesh.position.set(
        (value * this._options.size) / this._options.divisions,
        0,
        0
      );
    } else if (axis === 'y') {
      mesh.position.set(
        0,
        (value * this._options.size) / this._options.divisions,
        0
      );
    } else if (axis === 'z') {
      mesh.position.set(
        0,
        0,
        (value * this._options.size) / this._options.divisions
      );
    }
    return mesh;
  }

  private _gridsHelperLabelsLookAt(cameraPosition: Vector3) {
    if (this._idGroupLabels !== undefined) {
      this.getObjectById(this._idGroupLabels)?.children.forEach((l) => {
        l.lookAt(cameraPosition);
      });
    }
  }

  public _update(distance: number, cameraPosition: Vector3): void {
    const newSize = this._getSizeFromDistance(distance);
    let needResize = false;
    if (this._options.size !== newSize) {
      this._options.size = newSize;
      needResize = true;
    }
    if (needResize) {
      this._buildGridsHelper();
      this._buildGridsHelperLabels();
    }
    this._gridsHelperLabelsLookAt(cameraPosition);
  }

  private _getSizeFromDistance(distance: number): number {
    let i = GRIDS_HELPER_SIZES.length - 1;
    let size = 0;
    while (i >= 0 && size === 0) {
      if (distance / GRIDS_HELPER_SIZES[i] > 1) {
        size = GRIDS_HELPER_SIZES[i + 1];
      }
      i--;
    }
    return size;
  }
}

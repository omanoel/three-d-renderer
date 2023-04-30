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

  private _font: Font;
  private _textParameter: TextGeometryParameters;
  private _textMaterial: MeshBasicMaterial;
  private _idGroupLabels: number | undefined;

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
    //
    super(initActions);
    //
    this.type = 'ThreeDRendererGridsHelper';
    //
    this.userData.options = {
      ...DEFAULT_GRIDS_HELPER_OPTIONS,
      ...initOptions
    };
    //
    this.userData.options.size = this._getSizeFromDistance(distanceToTarget);
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
      opacity: 0.3,
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
      this.userData.options.xy = options.xy;
      this._buildGridsHelper();
    }
    if (options.position !== undefined) {
      this.userData.options.position = options.position;
      this._buildGridsHelperLabels();
    }
  }

  public tick(_deltaTime: number, params: ITickParams): void {
    this._update(params.targetPos, params.cameraPos, params.worldOrigin);
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _buildGridsHelper(): void {
    this.clear();
    if (this.userData.options.xz.visible) {
      const gridXZ = this._buildGridHelper(this.userData.options.xz);
      this.add(gridXZ);
    }
    if (this.userData.options.xy.visible) {
      const gridXY = this._buildGridHelper(this.userData.options.xy);
      gridXY.rotateX(Math.PI / 2);
      this.add(gridXY);
    }
    if (this.userData.options.yz.visible) {
      const gridYZ = this._buildGridHelper(this.userData.options.yz);
      gridYZ.rotateZ(Math.PI / 2);
      this.add(gridYZ);
    }
  }

  private _buildGridHelper(
    planeOptions: ThreeDRendererGridsHelperPlaneOptions
  ): GridHelper {
    const gridHelper = new GridHelper(
      this.userData.options.size,
      this.userData.options.divisions,
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
    this._textParameter.size = this.userData.options.size / 100;
    this._textParameter.height = this.userData.options.size / 200;
    for (let d = 1; d <= this.userData.options.divisions / 2; d++) {
      if (this.userData.options.xLabel.visible) {
        groupLabels.add(
          this._createLabel(d, 'x', this.userData.options.xLabel.units)
        );
        groupLabels.add(
          this._createLabel(-d, 'x', this.userData.options.xLabel.units)
        );
      }
      if (this.userData.options.yLabel.visible) {
        groupLabels.add(
          this._createLabel(d, 'y', this.userData.options.yLabel.units)
        );
        groupLabels.add(
          this._createLabel(-d, 'y', this.userData.options.yLabel.units)
        );
      }
      if (this.userData.options.zLabel.visible) {
        groupLabels.add(
          this._createLabel(d, 'z', this.userData.options.zLabel.units)
        );
        groupLabels.add(
          this._createLabel(-d, 'z', this.userData.options.zLabel.units)
        );
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
      this.userData.options.position[axis] +
        (value * this.userData.options.size) / this.userData.options.divisions
    );
    const textGeometry = new TextGeometry(
      labelPosText + (unit ? ' ' + unit : ''),
      this._textParameter
    );
    const mesh = new Mesh(textGeometry, this._textMaterial);
    if (axis === 'x') {
      mesh.position.set(
        (value * this.userData.options.size) / this.userData.options.divisions,
        0,
        0
      );
    } else if (axis === 'y') {
      mesh.position.set(
        0,
        (value * this.userData.options.size) / this.userData.options.divisions,
        0
      );
    } else if (axis === 'z') {
      mesh.position.set(
        0,
        0,
        (value * this.userData.options.size) / this.userData.options.divisions
      );
    }
    return mesh;
  }

  private _gridsHelperLabelsLookAt(cameraPosition: Vector3) {
    if (this._idGroupLabels !== undefined) {
      this.getObjectById(this._idGroupLabels)?.children.forEach((c) => {
        c.lookAt(cameraPosition);
        c.up.set(0, 0, 1);
      });
    }
  }

  public _update(
    targetPosition: Vector3,
    cameraPosition: Vector3,
    worldPosition: Vector3
  ): void {
    if (
      this.userData.options.autoScale == true &&
      this.userData.options.trackTarget == true
    ) {
      const distance = targetPosition.distanceTo(cameraPosition);
      const newSize = this._getSizeFromDistance(distance);
      let needResize = false;
      if (this.userData.options.size !== newSize) {
        this.userData.options.size = newSize;
        needResize = true;
      }
      const needReposition = this._adjustPosition(
        targetPosition,
        worldPosition
      );
      if (needResize || needReposition) {
        this._buildGridsHelper();
        this._buildGridsHelperLabels();
      }
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

  private _getNewValue(actual: number, next: number, delta: number): number {
    if (Math.abs(actual - next) > delta / 2) {
      if (actual < next) {
        return actual + delta;
      } else {
        return actual - delta;
      }
    } else {
      return actual;
    }
  }

  private _adjustPosition(
    targetPosition: Vector3,
    worldPosition: Vector3
  ): boolean {
    let needResize = false;
    const xyzTargetPos = new Vector3(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    );
    const newPosition = new Vector3().copy(this.position);
    while (
      xyzTargetPos.distanceTo(newPosition) >
      this.userData.options.size / 4
    ) {
      needResize = true;
      const deltaXYZ =
        this.userData.options.size / this.userData.options.divisions;
      let newX = this._getNewValue(newPosition.x, targetPosition.x, deltaXYZ);
      let newY = this._getNewValue(newPosition.y, targetPosition.y, deltaXYZ);
      let newZ = this._getNewValue(newPosition.z, targetPosition.z, deltaXYZ);
      newPosition.set(newX, newY, newZ);
      this.userData.options.position.x = worldPosition.x + newPosition.x;
      this.userData.options.position.y = worldPosition.y + newPosition.y;
      this.userData.options.position.z = worldPosition.z + newPosition.z;
    }
    if (needResize) {
      this.position.set(newPosition.x, newPosition.y, newPosition.z);
    }
    return needResize;
  }
}

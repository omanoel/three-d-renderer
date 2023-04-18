import {
  BufferGeometry,
  Camera,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector3,
} from "three";
import {
  TextGeometry,
  TextGeometryParameters,
} from "three/examples/jsm/geometries/TextGeometry";
import { Font } from "three/examples/jsm/loaders/FontLoader";

import {
  DEFAULT_INFINITE_GRIDS_HELPER_OPTIONS,
  ThreeDRendererInfiniteGridsHelperOptions,
  ZoomTypes,
} from "./infinite-grids-helper-options";
import { ThreeDRendererCamera } from "../basics/camera";
import { ThreeDRendererControls } from "../basics/controls";
import {
  AxisTypes,
  ThreeDRendererObject3DOptions,
} from "../../shared/i-options";
import { GetOptionValueUtil } from "../../shared/utils/get-option-value-util";
import { IConfigurable } from "../../shared/i-configurable";
import { DefaultFontLoaderUtil } from "../../shared/utils/default-font-loader-util";

export class ThreeDRendererInfiniteGridsHelper
  extends Group
  implements IConfigurable<ThreeDRendererInfiniteGridsHelperOptions>
{
  public readonly isInfiniteGridHelper = true;

  // TODO manage options per panel
  // private _xzPanelOptions: ThreeDRendererGridHelperPanelOptions;
  // private _xyPanelOptions: ThreeDRendererGridHelperPanelOptions;
  // private _yzPanelOptions: ThreeDRendererGridHelperPanelOptions;

  private _textMaterial: MeshBasicMaterial;
  private _lineBasicMaterial: LineBasicMaterial;
  private _camera: ThreeDRendererCamera;
  private _font: Font;
  private _controls: ThreeDRendererControls;
  private _options: ThreeDRendererInfiniteGridsHelperOptions;

  /**
   * Initialises an InfiniteGridHelper object, consisting on one Group regrouping 3 children Group
   * (one per plane: XZ, XY and YZ).
   * This object provides a square grid that scales with zoom in / zoom out
   */
  constructor(
    threeDRendererCamera: ThreeDRendererCamera,
    threeDRendererControls: ThreeDRendererControls,
    font: Font,
    initOptions?: Partial<ThreeDRendererInfiniteGridsHelperOptions>
  ) {
    super();
    this._camera = threeDRendererCamera;
    this._controls = threeDRendererControls;

    this._options = {
      ...DEFAULT_INFINITE_GRIDS_HELPER_OPTIONS,
      ...initOptions,
    };

    this._lineBasicMaterial = new LineBasicMaterial({
      color: this._options.color,
      transparent: this._options.opacity < 1,
      opacity: this._options.opacity,
    });

    // TODO add new default options for the coordinates
    this._textMaterial = new MeshBasicMaterial({
      opacity: 0.6,
      transparent: true,
    });

    this._font = font;

    // TODO manage options per panel
    // this._xzPanelOptions = initOptions.panelXZ;
    // this._xyPanelOptions = initOptions.panelXY;
    // this._yzPanelOptions = initOptions.panelYZ;

    this._buildGroup();
  }

  /**
   * Scales and translates the InfiniteGridHelper's Lines, to ensure continuous visibility depending on
   * zoom level (distance camera <-> target defined by OrbitControl).
   * Meant to be called as a one time update, or within reaction to OrbitControl changes.
   */
  public autoScale(): void {
    if (this._options.autoScale.active) {
      const distance = this._controls.distanceToTarget;
      this._autoScalePlane(
        <Group>this.children.find((c) => c.name === "xz"),
        ["x", "z"],
        distance
      );
      this._autoScalePlane(
        <Group>this.children.find((c) => c.name === "xy"),
        ["x", "y"],
        distance
      );
      this._autoScalePlane(
        <Group>this.children.find((c) => c.name === "yz"),
        ["y", "z"],
        distance
      );
    }
    this._updateMeshsLookAt(this._camera.position);
  }

  public updateWithOptions(
    options?: Partial<ThreeDRendererInfiniteGridsHelperOptions>
  ): void {
    if (options !== undefined) {
      this._options = {
        ...this._options,
        ...options,
      };
      this._lineBasicMaterial.color = new Color(this._options.color);
      this._lineBasicMaterial.transparent = this._options.opacity < 1;
      this._lineBasicMaterial.opacity = this._options.opacity;
      this.clear();
      this._buildGroup();
      this._updateObject3DWithOptions(this._options);
      this.autoScale();
    }
  }

  // =======================================
  // PRIVATE
  // =======================================
  private _buildGroup(): void {
    const xz = new Group();
    xz.name = "xz";
    xz.add(...this._generateSpacedLinesOnPlane(["x", "z"]));
    const xy = new Group();
    xy.name = "xy";
    xy.add(...this._generateSpacedLinesOnPlane(["x", "y"]));
    const yz = new Group();
    yz.name = "yz";
    yz.add(...this._generateSpacedLinesOnPlane(["y", "z"]));
    this.add(xz, xy, yz);
  }

  private _updateObject3DWithOptions(
    object3DOptions: Partial<ThreeDRendererObject3DOptions>
  ): void {
    this.visible = GetOptionValueUtil.getIfDefined(
      this.visible,
      object3DOptions.visible
    );
    if (object3DOptions.position) {
      this.position.set(
        GetOptionValueUtil.getIfDefined(
          this.position.x,
          object3DOptions.position.x
        ),
        GetOptionValueUtil.getIfDefined(
          this.position.y,
          object3DOptions.position.y
        ),
        GetOptionValueUtil.getIfDefined(
          this.position.z,
          object3DOptions.position.z
        )
      );
    }
  }

  /**
   * Everytime the view is updated, make the mesh linked to each line segment look at the camera to be able read
   * @param cameraPosition the camera position
   */
  private _updateMeshsLookAt(cameraPosition: Vector3): void {
    const lines: Object3D[] = this.getObjectsByProperty("isLineSegments", true);
    lines.forEach((line) => {
      if (line instanceof LineSegments) {
        const meshs: Object3D[] = line.getObjectsByProperty("isMesh", true);
        meshs.forEach((mesh) => {
          mesh.lookAt(cameraPosition);
        });
      }
    });
  }

  /**
   * Create the mesh and add it to the line segment.
   * @param camera the camera is needed because the text geometries always look at the camera so that it's readable everytime
   * @param labelCoordinates the label to display for the axis coordinates
   * @param textOption the text geometry options
   * @param line the line segment associated to the coordinate
   */
  private _createMeshAndAddItToLineSegment(
    camera: Camera,
    labelCoordinates: string,
    textOption: TextGeometryParameters,
    line: LineSegments
  ): void {
    const textGeometry = new TextGeometry(labelCoordinates, textOption);
    const mesh = new Mesh(textGeometry, this._textMaterial);
    mesh.lookAt(camera.position);
    line.add(mesh);
  }

  /**
   * Get the 3D position of a point
   * @param planeAxes the plane, ie: [x, z]
   * @param axisValues the values in the plane axis, ie: [3, 5]
   * @returns the position (x,y,z), ie: (3, 0, 5)
   */
  private _getCoordinate3dPosition(
    planeAxes: [AxisTypes, AxisTypes],
    axisValues: [number, number]
  ): Vector3 {
    const indexX = planeAxes.findIndex((axis) => axis === "x");
    const indexY = planeAxes.findIndex((axis) => axis === "y");
    const indexZ = planeAxes.findIndex((axis) => axis === "z");
    const x: number = indexX === -1 ? 0 : axisValues[indexX];
    const y: number = indexY === -1 ? 0 : axisValues[indexY];
    const z: number = indexZ === -1 ? 0 : axisValues[indexZ];
    return new Vector3(x, y, z);
  }

  private _autoScalePlane(
    group: Group,
    planeAxes: [AxisTypes, AxisTypes],
    distance: number
  ): void {
    const lines = group.getObjectsByProperty("isLineSegments", true);

    const axis = planeAxes[0];
    const orthogonalAxis = planeAxes[1];

    if (lines.length > 2) {
      const currentAxisScale = this._getCurrentSpacing(lines, axis);
      const currentOrthogonalAxisScale = this._getCurrentSpacing(
        lines,
        orthogonalAxis
      );

      lines.forEach((line) => {
        if (line instanceof LineSegments) {
          this._scaleLineZoomPlane(
            distance,
            line,
            planeAxes,
            [currentAxisScale, currentOrthogonalAxisScale],
            ZoomTypes.OUT
          );
          this._scaleLineZoomPlane(
            distance,
            line,
            planeAxes,
            [currentAxisScale, currentOrthogonalAxisScale],
            ZoomTypes.IN
          );
        }
      });
    }
  }

  private _generateSpacedLinesOnPlane(
    planeAxes: [AxisTypes, AxisTypes]
  ): Group[] {
    return [
      this._generateSpacedLinesAlongAxis(planeAxes[0], planeAxes[1]),
      this._generateSpacedLinesAlongAxis(planeAxes[1], planeAxes[0]),
    ];
  }

  private _generateSpacedLinesAlongAxis(
    axis: AxisTypes,
    orthogonalAxis: AxisTypes
  ): Group {
    const group = new Group();
    group.name = axis;

    const lines: LineSegments[] = [];

    const lineVerticesAbsolutePosition =
      this._options.autoScale &&
      this._options.autoScale.active &&
      this._options.autoScale.scaleJump
        ? Math.max(this._options.autoScale.scaleJump, this._options.spacing)
        : this._options.spacing;
    const x = axis === "x" ? lineVerticesAbsolutePosition : 0;
    const y = axis === "y" ? lineVerticesAbsolutePosition : 0;
    const z = axis === "z" ? lineVerticesAbsolutePosition : 0;

    const textParameters: TextGeometryParameters = {
      font: this._font, // An instance of THREE.Font.
      size: 0.1, // Float. Size of the text. Default is 100.
      height: 0.05, // Float. Thickness to extrude text. Default is 50.
      // The lowest curveSegments is the fastest it is
      curveSegments: 1, // Integer. Number of points on the curves. Default is 12.
      bevelEnabled: false, // Boolean. Turn on bevel. Default is False.
      bevelThickness: 1, // Float. How deep into text bevel goes. Default is 10.
      bevelSize: 1, // Float. How far from text outline is bevel. Default is 8.
      bevelOffset: 0, // Float. How far from text outline bevel starts. Default is 0.
      bevelSegments: 1, // Integer. Number of bevel segments. Default is 3.
    };

    for (let i = -this._options.size / 2; i <= this._options.size / 2; i++) {
      for (let j = -this._options.size / 2; j < this._options.size / 2; j++) {
        // Create a line segment
        const line = new LineSegments(
          new BufferGeometry().setFromPoints([
            new Vector3(0, 0, 0),
            new Vector3(x, y, z),
          ]),
          this._lineBasicMaterial
        );

        line[this._getTranslateMethodName(axis)](
          lineVerticesAbsolutePosition * j
        );
        line[this._getTranslateMethodName(orthogonalAxis)](
          lineVerticesAbsolutePosition * i
        );
        const axisValues: [number, number] = [
          line.position[axis],
          line.position[orthogonalAxis],
        ];

        // Create a mesh containing the text geometry used to display coordinates for each line segment and link it to the line
        this._addAxisCoordinatesForAllPlanes(
          axis,
          orthogonalAxis,
          axisValues,
          textParameters,
          line
        );
        lines.push(line);
      }
    }

    group.add(...lines);
    return group;
  }

  /**
   * Add axis coordinates for the 3 planes XZ, XY, YZ
   * @param axis the axis
   * @param orthogonalAxis the orthogonal axis
   * @param axisValues the coordinates values
   * @param textParameters the text parameters
   * @param line the line segment linked to the coordinates
   */
  private _addAxisCoordinatesForAllPlanes(
    axis: AxisTypes,
    orthogonalAxis: AxisTypes,
    axisValues: [number, number],
    textParameters: TextGeometryParameters,
    line: LineSegments<BufferGeometry, LineBasicMaterial>
  ): void {
    const textPosition: Vector3 = this._getCoordinate3dPosition(
      [axis, orthogonalAxis],
      axisValues
    );

    if (axis === "x" && orthogonalAxis === "z") {
      this._addCoordinatesToPlaneXZ(textPosition, textParameters, line);
    } else if (axis === "x" && orthogonalAxis === "y") {
      this._addCoordinatesToPlaneXY(textPosition, textParameters, line);
    } else if (axis === "y" && orthogonalAxis === "z") {
      this._addCoordinatesToPlaneYZ(textPosition, textParameters, line);
    }
  }

  /**
   * Add coordinates to plane YZ
   * @param textPosition the text position
   * @param textParameters the text parameters
   * @param line the line segment
   */
  private _addCoordinatesToPlaneYZ(
    textPosition: Vector3,
    textParameters: TextGeometryParameters,
    line: LineSegments<BufferGeometry, LineBasicMaterial>
  ): void {
    if (textPosition.y === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.z.toFixed(0),
        textParameters,
        line
      );
    }
    if (textPosition.z === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.y.toFixed(0),
        textParameters,
        line
      );
    }
  }

  /**
   * Add coordinates to plane XY
   * @param textPosition the text position
   * @param textParameters the text parameters
   * @param line the line segment
   */
  private _addCoordinatesToPlaneXY(
    textPosition: Vector3,
    textOption: TextGeometryParameters,
    line: LineSegments<BufferGeometry, LineBasicMaterial>
  ): void {
    if (textPosition.x === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.y.toFixed(0),
        textOption,
        line
      );
    }
    if (textPosition.y === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.x.toFixed(0),
        textOption,
        line
      );
    }
  }

  /**
   * Add coordinates to plane XZ
   * @param textPosition the text position
   * @param textParameters the text parameters
   * @param line the line segment
   */
  private _addCoordinatesToPlaneXZ(
    textPosition: Vector3,
    textOption: TextGeometryParameters,
    line: LineSegments<BufferGeometry, LineBasicMaterial>
  ): void {
    if (textPosition.x === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.z.toFixed(0),
        textOption,
        line
      );
    }
    if (textPosition.z === 0) {
      this._createMeshAndAddItToLineSegment(
        this._camera,
        textPosition.x.toFixed(0),
        textOption,
        line
      );
    }
  }

  private _getTranslateMethodName(
    axis: AxisTypes
  ): keyof Pick<Object3D, "translateX" | "translateY" | "translateZ"> {
    let method: keyof Pick<
      Object3D,
      "translateX" | "translateY" | "translateZ"
    >;
    switch (axis) {
      case "x":
        method = "translateX";
        break;
      case "y":
        method = "translateY";
        break;
      case "z":
        method = "translateZ";
        break;
    }
    return method;
  }

  private _scaleLineZoomPlane(
    distance: number,
    line: LineSegments,
    planeAxes: [AxisTypes, AxisTypes],
    scalesAxes: [number, number],
    zoomType: ZoomTypes
  ): void {
    const currentAxisScale = scalesAxes[0];

    const thresholdCondition =
      zoomType === ZoomTypes.IN
        ? distance <
          this._options.autoScale.linesOnScreen *
            (currentAxisScale / this._options.autoScale.scaleJump)
        : distance > this._options.autoScale.linesOnScreen * currentAxisScale;

    if (thresholdCondition) {
      this._translateAndScaleAlongAxis(line, planeAxes, scalesAxes, zoomType);
      this._translateAndScaleAlongAxis(
        line,
        [planeAxes[1], planeAxes[0]],
        scalesAxes,
        zoomType
      );

      if (
        line.position[planeAxes[0]] === 0 &&
        line.position[planeAxes[1]] === 0
      ) {
        this._scaleOriginAxis(line, planeAxes, scalesAxes, zoomType);
      }
    }
  }

  private _translateAndScaleAlongAxis(
    line: LineSegments,
    planeAxes: [AxisTypes, AxisTypes],
    scalesAxes: [number, number],
    zoomType: ZoomTypes
  ): void {
    const orthogonalAxis = planeAxes[1];

    if (line.position[orthogonalAxis] !== 0) {
      const translateValue =
        -line.position[orthogonalAxis] +
        (zoomType === ZoomTypes.IN
          ? line.position[orthogonalAxis] / this._options.autoScale.scaleJump
          : line.position[orthogonalAxis] * this._options.autoScale.scaleJump);
      line[this._getTranslateMethodName(orthogonalAxis)](translateValue);
    }

    this._scaleOriginAxis(line, planeAxes, scalesAxes, zoomType);
  }

  private _scaleOriginAxis(
    line: LineSegments,
    planeAxes: [AxisTypes, AxisTypes],
    scalesAxes: [number, number],
    zoomType: ZoomTypes
  ): void {
    const xAxisScaleValue = this._getAxisScaleValue(
      "x",
      planeAxes,
      scalesAxes,
      zoomType
    );
    const yAxisScaleValue = this._getAxisScaleValue(
      "y",
      planeAxes,
      scalesAxes,
      zoomType
    );
    const zAxisScaleValue = this._getAxisScaleValue(
      "z",
      planeAxes,
      scalesAxes,
      zoomType
    );

    line.scale.set(xAxisScaleValue, yAxisScaleValue, zAxisScaleValue);
  }

  private _getAxisScaleValue(
    axisValue: AxisTypes,
    planeAxes: [AxisTypes, AxisTypes],
    scalesAxes: [number, number],
    zoomType: ZoomTypes
  ): number {
    const axis = planeAxes[0];
    const orthogonalAxis = planeAxes[1];

    const currentAxisScale = scalesAxes[0];
    const currentOrthogonalAxisScale = scalesAxes[1];

    let axisScaleValue: number;

    if (axis === axisValue) {
      axisScaleValue = this._getZoomScale(
        currentAxisScale,
        this._options.autoScale.scaleJump,
        zoomType
      );
    } else if (orthogonalAxis === axisValue) {
      axisScaleValue = this._getZoomScale(
        currentOrthogonalAxisScale,
        this._options.autoScale.scaleJump,
        zoomType
      );
    } else {
      axisScaleValue = 1;
    }

    return axisScaleValue;
  }

  private _getZoomScale(
    scale: number,
    scaleJump: number,
    zoomType: ZoomTypes
  ): number {
    return zoomType === ZoomTypes.IN ? scale / (scaleJump * scaleJump) : scale;
  }

  private _getCurrentSpacing(lines: Object3D[], property: AxisTypes): number {
    const absolutePositions = lines.map((line) =>
      Math.abs(line.position[property])
    );
    absolutePositions.sort((a, b) => a - b);
    let currentScale = 0;
    for (let index = 0; index < absolutePositions.length - 1; index++) {
      const spacing = absolutePositions[index + 1] - absolutePositions[index];
      if (
        currentScale <
        absolutePositions[index + 1] - absolutePositions[index]
      ) {
        currentScale = spacing;
      }
    }
    return currentScale;
  }
}

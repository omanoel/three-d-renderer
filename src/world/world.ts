import { Intersection, Object3D } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { GetOptionValueUtil } from './../shared/utils/get-option-value-util';
import { ThreeDRendererBasics } from './basics/_basics';
import { ThreeDRendererComponents } from './components/_components';
import { ThreeDRendererHelpers } from './helpers/_helpers';
import { ThreeDRendererPanels } from './panels/_panels';
import { InfoBox } from './panels/info-box';
import jsonFont from './shared/fonts/optimer_bold.typeface.json';
import { ThreeDRendererLoop } from './systems/loop';
import { ThreeDRendererRenderer } from './systems/renderer';
import { ThreeDRendererWindowResizer } from './systems/window-resizer';
import { ThreeDRendererWorldApi } from './world-api';
import {
  DEFAULT_WORLD_OPTIONS,
  ThreeDRendererWorldOptions,
} from './world-options';

export class ThreeDRendererWorld {
  //
  private _api: ThreeDRendererWorldApi;
  private _threeDRendererRenderer: ThreeDRendererRenderer;
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _threeDRendererHelpers: ThreeDRendererHelpers;
  private _threeDRendererComponents: ThreeDRendererComponents;
  private _threeDRendererPanels: ThreeDRendererPanels;
  private _loop: ThreeDRendererLoop;
  private _infoBox: InfoBox;
  private _previousDistance: number;
  private _options: ThreeDRendererWorldOptions;
  //
  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererWorldOptions>
  ) {
    // OPTIONS
    this._options = {
      ...DEFAULT_WORLD_OPTIONS,
      ...initOptions,
    };

    // Default Font
    const defaultFont = new Font(jsonFont);

    // Renderer
    this._threeDRendererRenderer = new ThreeDRendererRenderer();
    domContainer.append(this._threeDRendererRenderer.domElement);

    // Basics
    this._threeDRendererBasics = new ThreeDRendererBasics(
      domContainer,
      this._threeDRendererRenderer,
      this._options.basics
    );

    // Helpers
    this._threeDRendererHelpers = new ThreeDRendererHelpers(
      this._threeDRendererBasics.threeDRendererCamera,
      this._threeDRendererBasics.threeDRendererControls,
      defaultFont,
      this._options.worldOrigin,
      this._options.helpers
    );
    // Components
    this._threeDRendererComponents = new ThreeDRendererComponents();
    this._threeDRendererBasics.threeDRendererScene.add(
      this._threeDRendererHelpers,
      this._threeDRendererComponents
    );
    this._previousDistance =
      this._threeDRendererBasics.threeDRendererControls.distanceToTarget;
    this._handleEvents();

    const threeDRendererWindowResizer = new ThreeDRendererWindowResizer(
      domContainer,
      this._threeDRendererRenderer,
      this._threeDRendererBasics.threeDRendererCamera
    );
    threeDRendererWindowResizer.onResize = () => {
      this.render();
    };
    this._loop = new ThreeDRendererLoop(
      this._threeDRendererRenderer,
      this._threeDRendererBasics.threeDRendererCamera,
      this._threeDRendererBasics.threeDRendererScene
    );
    this._infoBox = new InfoBox(domContainer, 'info');
    this._threeDRendererPanels = new ThreeDRendererPanels(
      domContainer,
      this.options.panels
    );
    // API
    this._api = new ThreeDRendererWorldApi(
      this._threeDRendererBasics,
      this._threeDRendererPanels,
      this._threeDRendererHelpers
    );
  }

  public render(): void {
    this._threeDRendererRenderer.render(
      this._threeDRendererBasics.threeDRendererScene,
      this._threeDRendererBasics.threeDRendererCamera
    );
  }

  public start(): void {
    this._loop.start();
  }
  public stop(): void {
    this._loop.stop();
  }
  public get api(): ThreeDRendererWorldApi {
    return this._api;
  }
  public get options(): ThreeDRendererWorldOptions {
    return this._options;
  }

  private _handleEvents(): void {
    this._handleRaycasterMouseOver();
    this._handleRaycasterMouseOut();
    this._handleRaycasterMouseDblClick();
    this._handleControlsChange();
  }

  private _handleRaycasterMouseOver(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOver = (
      intersected: Intersection<Object3D>
    ) => {
      this._threeDRendererHelpers.threeDRendererCrossPointer.display(
        intersected.point
      );
      this._infoBox.setInnerHtml(
        'Intersect at (' +
          GetOptionValueUtil.getFixedValue(
            intersected.point.x + this._options.worldOrigin.x
          ) +
          ' , ' +
          GetOptionValueUtil.getFixedValue(
            intersected.point.y + this._options.worldOrigin.y
          ) +
          ' , ' +
          GetOptionValueUtil.getFixedValue(
            intersected.point.z + this._options.worldOrigin.z
          ) +
          ')'
      );
      this._handleMouseOver(intersected.object);
      this.render();
    };
  }
  private _handleRaycasterMouseOut(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOut = () => {
      this._threeDRendererHelpers.threeDRendererCrossPointer.hide();
      // this._threeDRendererRaycasterTip.hide();
      if (
        this._threeDRendererBasics.threeDRendererRaycaster.intersected !==
        undefined
      ) {
        this._handleMouseOut(
          this._threeDRendererBasics.threeDRendererRaycaster.intersected.object
        );
      }
      // this._threeDRendererBasics.threeDRendererRaycaster.intersected?.onMouseOut();
      this._threeDRendererBasics.threeDRendererRaycaster.clearIntersected();
      this.render();
    };
  }
  private _handleRaycasterMouseDblClick(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseDblClick = (
      intersected: Intersection
    ) => {
      this._threeDRendererBasics.threeDRendererControls.enableDamping = true;
      this._threeDRendererBasics.threeDRendererControls.enabled = false;
      this._threeDRendererBasics.threeDRendererControls.setTarget(
        intersected.point
      );
      this._threeDRendererBasics.threeDRendererControls.update();
      this.render();
      this._threeDRendererBasics.threeDRendererControls.enableDamping = false;
      this._threeDRendererBasics.threeDRendererControls.enabled = true;
      this._threeDRendererBasics.threeDRendererControls.update();
    };
  }

  public _handleControlsChange(): void {
    this._threeDRendererBasics.threeDRendererControls.handleChange = () => {
      const distance =
        this._threeDRendererBasics.threeDRendererControls.distanceToTarget;
      this._infoBox.setInnerHtml(
        'Distance: ' +
          GetOptionValueUtil.getFixedValue(distance) +
          '<br>' +
          'Count:' +
          this._threeDRendererBasics.threeDRendererScene.countObjects +
          '<br>'
      );
      this._previousDistance =
        this._threeDRendererHelpers.threeDRendererGridsHelper.resize(
          distance,
          this._previousDistance,
          this._threeDRendererBasics.threeDRendererCamera.position
        );
      this._threeDRendererHelpers.threeDRendererCrossPointer.resize(distance);
      this._threeDRendererHelpers.threeDRendererAxesHelper.resize(distance);
      this.render();
    };
  }
  private _handleMouseOver(obj: Object3D): void {
    if (obj.userData.onMouseOver !== undefined) {
      obj.userData.onMouseOver();
    } else {
      if (obj.parent !== null) {
        this._handleMouseOver(obj.parent);
      }
    }
  }
  private _handleMouseOut(obj: Object3D): void {
    if (obj.userData.onMouseOut !== undefined) {
      obj.userData.onMouseOut();
    } else {
      if (obj.parent !== null) {
        this._handleMouseOut(obj.parent);
      }
    }
  }
}

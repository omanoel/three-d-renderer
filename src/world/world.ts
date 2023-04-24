import { Intersection, Object3D } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { FindObjectUtil } from '../shared/utils/find-object-util';
import { GetOptionValueUtil } from './../shared/utils/get-option-value-util';
import { ThreeDRendererBasics } from './basics/_basics';
import { ThreeDRendererComponents } from './components/_components';
import { ThreeDRendererHelpers } from './helpers/_helpers';
import { ThreeDRendererPanels } from './panels/_panels';
import { InfoBox } from './panels/info-box';
import jsonFont from './shared/fonts/optimer_bold.typeface.json';
import { ThreeDRendererLoop } from './systems/loop';
import { ThreeDRendererRenderer } from './systems/renderer';
import { ThreeDRendererResizer } from './systems/resizer';
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

    const threeDRendererResizer = new ThreeDRendererResizer(
      domContainer,
      this._threeDRendererRenderer,
      this._threeDRendererBasics.threeDRendererCamera
    );
    threeDRendererResizer.onResize = () => {
      this.render();
    };
    this._loop = new ThreeDRendererLoop(
      this._threeDRendererRenderer,
      this._threeDRendererBasics.threeDRendererCamera,
      this._threeDRendererBasics.threeDRendererScene
    );
    this._infoBox = new InfoBox(domContainer);
    this._threeDRendererPanels = new ThreeDRendererPanels(
      domContainer,
      this.options.panels
    );
    // API
    this._api = new ThreeDRendererWorldApi(
      this.options,
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
      this._infoBox.addMessagePosition(
        'raycaster',
        'Intersect with [' +
          FindObjectUtil.findMethodMouseOut(intersected.object)?.name +
          '] at',
        GetOptionValueUtil.getWorldVector3(
          intersected.point,
          this._options.worldOrigin
        )
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
      this._infoBox.removeMessage('raycaster');
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
      this._infoBox.addMessage(
        'distance',
        'Distance: ' + GetOptionValueUtil.getFixedValue(distance)
      );
      this._infoBox.addMessage(
        'count',
        'Count:' + this._threeDRendererBasics.threeDRendererScene.countObjects
      );
      this._infoBox.addMessagePosition(
        'Camera',
        'Camera at: ',
        GetOptionValueUtil.getWorldVector3(
          this._threeDRendererBasics.threeDRendererCamera.position,
          this._options.worldOrigin
        )
      );
      this._infoBox.addMessagePosition(
        'target',
        'Target at',
        GetOptionValueUtil.getWorldVector3(
          this._threeDRendererBasics.threeDRendererControls.target,
          this._options.worldOrigin
        )
      );
      this._threeDRendererHelpers.threeDRendererGridsHelper.resize(
        distance,
        this._threeDRendererBasics.threeDRendererCamera.position
      );
      this._threeDRendererHelpers.threeDRendererCrossPointer.resize(distance);
      this._threeDRendererHelpers.threeDRendererAxesHelper.resize(
        distance,
        this._threeDRendererBasics.threeDRendererControls.target
      );
      this.render();
    };
  }
  private _handleMouseOver(obj: Object3D): void {
    const objWithMouseOver = FindObjectUtil.findMethodMouseOver(obj);
    if (objWithMouseOver !== undefined) {
      objWithMouseOver.userData.onMouseOver();
    }
  }
  private _handleMouseOut(obj: Object3D): void {
    const objWithMouseOver = FindObjectUtil.findMethodMouseOut(obj);
    if (objWithMouseOver !== undefined) {
      objWithMouseOver.userData.onMouseOut();
    }
  }
}

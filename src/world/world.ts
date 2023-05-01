import { Intersection, Object3D } from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader';
import { ITickParams } from '../shared';
import { FindObjectUtil } from '../shared/utils/find-object-util';
import { GetOptionValueUtil } from './../shared/utils/get-option-value-util';
import jsonFont from './assets/fonts/optimer_bold.typeface.json';
import { ThreeDRendererBasics } from './basics/_basics';
import { ThreeDRendererComponents } from './components/_components';
import { ThreeDRendererHelpers } from './helpers/_helpers';
import { ThreeDRendererStats } from './panels';
import { ThreeDRendererInfoBox } from './panels/info-box';
import { ThreeDRendererRenderer } from './systems/renderer';
import { ThreeDRendererResizer } from './systems/resizer';
import { ThreeDRendererWorldApi } from './world-api';
import {
  DEFAULT_WORLD_OPTIONS,
  ThreeDRendererWorldOptions
} from './world-options';

export class ThreeDRendererWorld {
  //
  private _api: ThreeDRendererWorldApi;
  private _domContainer: HTMLDivElement;
  private _threeDRendererRenderer: ThreeDRendererRenderer;
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _threeDRendererHelpers: ThreeDRendererHelpers;
  private _threeDRendererComponents: ThreeDRendererComponents;
  private _threeDRendererResizer: ThreeDRendererResizer;
  private _threeDRendererInfoBox: ThreeDRendererInfoBox | undefined;
  private _threeDRendererStats: ThreeDRendererStats | undefined;
  private _options: ThreeDRendererWorldOptions;
  //
  constructor(
    domContainer: HTMLDivElement,
    initOptions?: Partial<ThreeDRendererWorldOptions>
  ) {
    // HTML Div Element
    this._domContainer = domContainer;

    // OPTIONS
    this._options = {
      ...DEFAULT_WORLD_OPTIONS,
      ...initOptions
    };

    // Default Font
    const defaultFont = new Font(jsonFont);

    // Renderer
    this._threeDRendererRenderer = new ThreeDRendererRenderer(
      this._domContainer
    );

    // Basics
    this._threeDRendererBasics = new ThreeDRendererBasics(
      this._domContainer,
      this._threeDRendererRenderer,
      this._options.worldOrigin,
      this._options.basics
    );

    // Resizer
    this._threeDRendererResizer = new ThreeDRendererResizer(
      this._domContainer,
      this._threeDRendererRenderer,
      this._threeDRendererBasics.threeDRendererCamera
    );

    // Helpers
    this._threeDRendererHelpers = new ThreeDRendererHelpers(
      this._threeDRendererBasics.threeDRendererCamera,
      this._threeDRendererBasics.threeDRendererControls,
      defaultFont,
      this._options.helpers
    );

    // Components
    this._threeDRendererComponents = new ThreeDRendererComponents(
      this._threeDRendererBasics.threeDRendererControls
    );

    // API
    this._api = new ThreeDRendererWorldApi(this);

    // Add helpers + components in scene
    this._api.addObject(this._threeDRendererHelpers.threeDRendererAxesHelper);
    this._api.addObject(this._threeDRendererHelpers.threeDRendererCrossPointer);
    this._api.addObject(this._threeDRendererHelpers.threeDRendererGridsHelper);
    this._api.addObject(this._threeDRendererHelpers.threeDRendererTargetHelper);
    this._api.addObject(
      this._threeDRendererComponents.threeDRendererAmbientLight
    );
    // this._api.addObject(
    //   this._threeDRendererComponents.threeDRendererDirectionalLight
    // );
    // this._api.addObject(this._threeDRendererComponents.threeDRendererSkybox);

    // Info box
    this._threeDRendererInfoBox = new ThreeDRendererInfoBox(this._domContainer);

    if (this._options.displayStats) {
      this._threeDRendererStats = new ThreeDRendererStats(this._domContainer);
    }

    // Handle events
    this._handleEvents();
  }

  public render(): void {
    this._tick(0);
    this._threeDRendererStats?.panel.update();
    this._threeDRendererRenderer.render(
      this._threeDRendererBasics.threeDRendererScene,
      this._threeDRendererBasics.threeDRendererCamera
    );
  }
  public animate(): void {
    // if (this._isAnimate) {
    //   requestAnimationFrame(this.animate);
    // }
    this.render();
  }

  // public start(): void {
  //   this._loop.start();
  // }
  // public stop(): void {
  //   this._loop.stop();
  // }
  public get api(): ThreeDRendererWorldApi {
    return this._api;
  }
  public get options(): ThreeDRendererWorldOptions {
    return this._options;
  }
  public get threeDRendererRenderer(): ThreeDRendererRenderer {
    return this._threeDRendererRenderer;
  }
  public get threeDRendererBasics(): ThreeDRendererBasics {
    return this._threeDRendererBasics;
  }
  public get threeDRendererHelpers(): ThreeDRendererHelpers {
    return this._threeDRendererHelpers;
  }
  private _tick(deltaTime: number): void {
    this._threeDRendererBasics.threeDRendererScene.tickableObjects.forEach(
      (t: Object3D) => {
        const distanceToCamera = t.userData.computeDistanceToCamera(
          this._threeDRendererBasics.threeDRendererCamera.position
        );
        const tickParams: ITickParams = {
          distance: distanceToCamera,
          worldOrigin: GetOptionValueUtil.getVector3(this._options.worldOrigin),
          cameraPos: this._threeDRendererBasics.threeDRendererCamera.position,
          targetPos: this._threeDRendererBasics.threeDRendererControls.target
        };
        if (t.userData.onTick !== undefined) {
          t.userData.onTick(deltaTime, tickParams);
        }
      }
    );
  }

  private _handleEvents(): void {
    this._handleRaycasterMouseOver();
    this._handleRaycasterMouseOut();
    this._handleRaycasterMouseDblClick();
    this._handleControlsChange();
    this._handleResize();
  }

  private _handleResize(): void {
    this._threeDRendererResizer.onResize = () => {
      this.render();
    };
  }

  private _handleRaycasterMouseOver(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOver = (
      intersected: Intersection
    ) => {
      this._handleMouseOver(intersected);
      this._threeDRendererHelpers.threeDRendererCrossPointer.display(
        intersected.point
      );
      this._threeDRendererInfoBox?.addMessagePosition(
        'raycaster',
        'Intersect with [' +
          FindObjectUtil.findClickable(intersected.object)?.name +
          '] at',
        GetOptionValueUtil.getWorldVector3(
          intersected.point,
          this._options.worldOrigin
        )
      );
      this.render();
    };
  }
  private _handleRaycasterMouseOut(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOut = (
      intersected: Intersection
    ) => {
      this._handleMouseOut(intersected);
      this._threeDRendererHelpers.threeDRendererCrossPointer.hide();
      this._threeDRendererInfoBox?.removeMessage('raycaster');
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
      this._threeDRendererInfoBox?.addMessage(
        'distance',
        'Distance: ' + GetOptionValueUtil.getFixedValue(distance)
      );
      this._threeDRendererInfoBox?.addMessage(
        'count',
        'Count:' + this._threeDRendererBasics.threeDRendererScene.countObjects
      );
      this._threeDRendererInfoBox?.addMessagePosition(
        'Camera',
        'Camera at: ',
        GetOptionValueUtil.getWorldVector3(
          this._threeDRendererBasics.threeDRendererCamera.position,
          this._options.worldOrigin
        )
      );
      this._threeDRendererInfoBox?.addMessagePosition(
        'target',
        'Target at',
        GetOptionValueUtil.getWorldVector3(
          this._threeDRendererBasics.threeDRendererControls.target,
          this._options.worldOrigin
        )
      );
      this.render();
    };
  }
  private _handleMouseOver(intersected: Intersection): void {
    const objWithMouseOver = FindObjectUtil.findMethodMouseOver(
      intersected.object
    );
    if (objWithMouseOver !== undefined) {
      objWithMouseOver.userData.onMouseOver(
        intersected.point,
        objWithMouseOver
      );
    }
  }
  private _handleMouseOut(intersected: Intersection): void {
    const objWithMouseOut = FindObjectUtil.findMethodMouseOut(
      intersected.object
    );
    if (objWithMouseOut !== undefined) {
      objWithMouseOut.userData.onMouseOut(intersected.point, objWithMouseOut);
    }
  }
}

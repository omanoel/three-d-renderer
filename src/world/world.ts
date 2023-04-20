import { GetOptionValueUtil } from "./../shared/utils/get-option-value-util";
import { ThreeDRendererRenderer } from "./systems/renderer";
import { ThreeDRendererWindowResizer } from "./systems/window-resizer";
import { ThreeDRendererLoop } from "./systems/loop";
import { InfoBox } from "./panels/info-box";
import { Group, Intersection, Object3D } from "three";
import { ThreeDRendererHelpers } from "./helpers/_helpers";
import { ThreeDRendererComponents } from "./components/_components";
import { ThreeDRendererBasics } from "./basics/_basics";
import { Font } from "three/examples/jsm/loaders/FontLoader";

export class ThreeDRendererWorld {
  //
  private _threeDRendererRenderer: ThreeDRendererRenderer;
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _loop: ThreeDRendererLoop;
  private _threeDRendererHelpers: ThreeDRendererHelpers;
  private _threeDRendererComponents: ThreeDRendererComponents;
  private _infoBox: InfoBox;
  private _previousDistance: number;
  //
  constructor(domContainer: HTMLDivElement, font: Font) {
    this._threeDRendererRenderer = new ThreeDRendererRenderer();
    domContainer.append(this._threeDRendererRenderer.domElement);

    // Basics
    this._threeDRendererBasics = new ThreeDRendererBasics(
      domContainer,
      this._threeDRendererRenderer
    );
    // Helpers
    this._threeDRendererHelpers = new ThreeDRendererHelpers(
      this._threeDRendererBasics.threeDRendererCamera,
      this._threeDRendererBasics.threeDRendererControls,
      font
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
    this._infoBox = new InfoBox(domContainer, "info");
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

  public addComponents(): void {}

  public addGroup(group: Group): void {
    this._threeDRendererBasics.threeDRendererScene.add(group);
  }

  private _handleEvents(): void {
    this._handleRaycasterMouseOver();
    this._handleRaycasterMouseOut();
    this._handleRaycasterMouseDblClick();
    this._handleRaycasterMouseClick();
    this._handleControlsChange();
  }

  private _handleRaycasterMouseOver(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOver = (
      intersected: Intersection<Object3D>
    ) => {
      this._threeDRendererHelpers.threeDRendererCrossPointer.display(
        intersected.point
      );
      // this._threeDRendererRaycasterTip.display(intersected);
      this.render();
    };
  }
  private _handleRaycasterMouseOut(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseOut = () => {
      this._threeDRendererHelpers.threeDRendererCrossPointer.hide();
      // this._threeDRendererRaycasterTip.hide();
      this.render();
    };
  }
  private _handleRaycasterMouseClick(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseClick = (
      intersected: Intersection<Object3D>
    ) => {
      if ((intersected.object as any).onMouseClick !== undefined) {
        (intersected.object as any).onMouseClick({
          target: intersected.object,
        });
      }
      if ((intersected.object as any).parent.onMouseClick !== undefined) {
        (intersected.object as any).parent.onMouseClick({
          target: intersected.object,
        });
      }
    };
  }
  private _handleRaycasterMouseDblClick(): void {
    this._threeDRendererBasics.threeDRendererRaycaster.handleMouseDblClick = (
      intersected: Intersection<Object3D>
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
        "Distance: " +
          GetOptionValueUtil.getFixedValue(distance) +
          "<br>" +
          "Count:" +
          this._threeDRendererBasics.threeDRendererScene.countObjects +
          "<br>"
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
}

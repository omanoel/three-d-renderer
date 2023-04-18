import { ThreeDRendererCube } from "../app/components/cube";
import { ThreeDRendererRenderer } from "./systems/renderer";
import { ThreeDRendererWindowResizer } from "./systems/window-resizer";
import { ThreeDRendererLoop } from "./systems/loop";
import { InfoBox } from "./panels/info-box";
import {
  BoxGeometry,
  Intersection,
  MeshStandardMaterial,
  Object3D,
} from "three";
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

  public addMesh(): void {
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({ color: "purple" });
    // create a Mesh containing the geometry and material
    const cube = new ThreeDRendererCube(geometry, material);
    cube.position.set(-0.5, -0.1, 0.8);
    cube.rotation.set(-0.5, -0.1, 0.8);
    this._threeDRendererBasics.threeDRendererScene.add(cube);
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
      this._infoBox.setInnerHtml("Distance: " + distance + "<br>");
      let needResize = false;
      if (distance >= this._previousDistance * 2) {
        this._previousDistance *= 2;
        needResize = true;
      } else if (distance <= this._previousDistance / 2) {
        this._previousDistance /= 2;
        needResize = true;
      }
      if (needResize) {
        this._threeDRendererHelpers.threeDRendererGridsHelper.updateWithOptions(
          {
            size: this._previousDistance,
          }
        );
      }
      this._threeDRendererHelpers.threeDRendererInfiniteGridsHelper.autoScale();
      this.render();
    };
  }
}

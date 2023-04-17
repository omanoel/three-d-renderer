import { ThreeDRendererCube } from "../app/components/cube";
import { ThreeDRendererRenderer } from "./systems/renderer";
import { ThreeDRendererWindowResizer } from "./systems/window-resizer";
import { ThreeDRendererLoop } from "./systems/loop";
import { InfoBox } from "./panels/info-box";
import { BoxGeometry, MeshStandardMaterial } from "three";
import { ThreeDRendererHelpers } from "./helpers/_helpers";
import { ThreeDRendererComponents } from "./components/_components";
import { ThreeDRendererBasics } from "./basics/_basics";

export class ThreeDRendererWorld {
  //
  private _threeDRendererRenderer: ThreeDRendererRenderer;
  private _threeDRendererBasics: ThreeDRendererBasics;
  private _loop: ThreeDRendererLoop;
  private _threeDRendererHelpers: ThreeDRendererHelpers | undefined;
  private _threeDRendererComponents: ThreeDRendererComponents | undefined;
  private _infoBox: InfoBox;
  private _previousDistance: number;
  //
  constructor(domContainer: HTMLDivElement) {
    this._threeDRendererRenderer = new ThreeDRendererRenderer();
    domContainer.append(this._threeDRendererRenderer.domElement);

    this._threeDRendererBasics = new ThreeDRendererBasics(domContainer);
    this._previousDistance =
      this._threeDRendererBasics.threeDRendererControls.distanceToTarget;
    this.handleEvents();
    this.addHelpers();
    this.addComponents();

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

  public addHelpers(): void {
    this._threeDRendererHelpers = new ThreeDRendererHelpers();
    this._threeDRendererBasics.threeDRendererScene.add(
      this._threeDRendererHelpers
    );
  }

  public addComponents(): void {
    this._threeDRendererComponents = new ThreeDRendererComponents();
    this._threeDRendererBasics.threeDRendererScene.add(
      this._threeDRendererComponents
    );
  }

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

  public handleEvents(): void {
    this.handleControlsChange();
  }

  public handleControlsChange(): void {
    this._threeDRendererBasics.threeDRendererControls.handleChange = () => {
      const distance =
        this._threeDRendererBasics.threeDRendererControls.distanceToTarget;
      this._infoBox.setInnerHtml("Distance: " + distance + "<br>");
      if (
        distance >= this._previousDistance * 2 ||
        distance <= this._previousDistance / 2
      ) {
        this._previousDistance = distance;
        this._threeDRendererHelpers?.threeDRendererGridsHelper.updateWithOptions(
          {
            size: distance,
          }
        );
      }
      this.render();
    };
  }
}

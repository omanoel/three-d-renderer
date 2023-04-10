import { ExpandedCamera } from './components/basics/camera';
import { ExpandedCube } from './components/basics/cube';
import { ExpandedDirectionalLight } from './components/basics/directional-light';
import { ExpandedScene } from './components/basics/scene';
import { ExpandedRenderer } from './engines/renderer';
import { ExpandedWindowResizer } from './engines/window-resizer';
import { ExpandedControls } from './components/basics/controls';
import { ExpandedLoop } from './engines/loop';
import { ExpandedAmbientLight } from './components/basics/ambient-light';
import { ExpandedGridHelpers } from './components/basics/grid-helpers';
import { InfoBox } from './popins/info-box';

export class World {
  //
  private _expandedCamera: ExpandedCamera;
  private _expandedScene: ExpandedScene;
  private _expandedRenderer: ExpandedRenderer;
  private _expandedCube: ExpandedCube;
  private _loop: ExpandedLoop;
  private _expandedGridHelpers: ExpandedGridHelpers;
  private _infoBox: InfoBox;
  //
  constructor(container: HTMLDivElement) {
    this._expandedRenderer = new ExpandedRenderer();
    container.append(this._expandedRenderer.renderer.domElement);

    this._expandedCamera = new ExpandedCamera();
    this._expandedScene = new ExpandedScene();
    this._expandedCube = new ExpandedCube();
    this._expandedGridHelpers = new ExpandedGridHelpers();
    this._expandedScene.scene.add(
      this._expandedGridHelpers.gridHelpers,
      this._expandedCube.cube,
      new ExpandedDirectionalLight().light,
      new ExpandedAmbientLight().light
    );
    const expandedControls = new ExpandedControls(
      this._expandedCamera.camera,
      container
    );
    expandedControls.handleChange = () => {
      this._infoBox.setInnerHtml(
        'Distance: ' +
          expandedControls.controls.target.distanceTo(
            this._expandedCamera.camera.position
          ) +
          '<br>'
      );
      this.render();
    };

    const expandedWindowResizer = new ExpandedWindowResizer(
      container,
      this._expandedRenderer.renderer,
      this._expandedCamera.camera
    );
    expandedWindowResizer.onResize = () => {
      this.render();
    };
    this._loop = new ExpandedLoop(
      this._expandedRenderer.renderer,
      this._expandedCamera.camera,
      this._expandedScene.scene
    );
    this._infoBox = new InfoBox(container, 'info');
  }

  public render(): void {
    this._expandedRenderer.renderer.render(
      this._expandedScene.scene,
      this._expandedCamera.camera
    );
  }

  public start(): void {
    this._loop.start();
  }
  public stop(): void {
    this._loop.stop();
  }
}

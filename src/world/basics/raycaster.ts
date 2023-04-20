import { Intersection, Object3D, Raycaster, Vector2 } from "three";
import { IConfigurable } from "../../shared/i-configurable";
import {
  ThreeDRendererRaycasterOptions,
  DEFAULT_RAYCASTER_OPTIONS,
} from "./raycaster-options";
import { ThreeDRendererRenderer } from "../systems/renderer";
import { ThreeDRendererScene } from "../basics/scene";
import { ThreeDRendererCamera } from "../basics/camera";

export class ThreeDRendererRaycaster
  extends Raycaster
  implements IConfigurable<ThreeDRendererRaycasterOptions>
{
  private _isActive = true;
  /**
   * @param domContainer The DOM container
   * @param threeDRendererRenderer The renderer
   * @param threeDRendererScene The scene
   * @param threeDRendererCamera The camera
   * @param initOptions The options at initialisation (optional)
   */
  constructor(
    domContainer: HTMLDivElement,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera,
    initOptions?: Partial<ThreeDRendererRaycasterOptions>
  ) {
    super();
    const options = {
      ...DEFAULT_RAYCASTER_OPTIONS,
      ...initOptions,
    };
    this._isActive = options.isActive;
    domContainer.ownerDocument.addEventListener(
      "mousemove",
      (mouseEvent: MouseEvent) => {
        if (this._isActive) {
          this._handleMouseMove(
            mouseEvent,
            threeDRendererRenderer,
            threeDRendererScene,
            threeDRendererCamera
          );
        }
      },
      false
    );
    domContainer.ownerDocument.addEventListener(
      "dblclick",
      (mouseEvent: MouseEvent) => {
        if (this._isActive) {
          this._handleMouseDblClick(
            mouseEvent,
            threeDRendererRenderer,
            threeDRendererScene,
            threeDRendererCamera
          );
        }
      },
      false
    );
    domContainer.ownerDocument.addEventListener(
      "click",
      (mouseEvent: MouseEvent) => {
        if (this._isActive) {
          this._handleMouseClick(
            mouseEvent,
            threeDRendererRenderer,
            threeDRendererScene,
            threeDRendererCamera
          );
        }
      },
      false
    );
  }

  public handleMouseOver(_intersected: Intersection<Object3D>): void {
    // Empty here
  }
  public handleMouseOut(): void {
    // Empty here
  }
  public handleMouseDblClick(_intersected: Intersection<Object3D>): void {
    // Empty here
  }
  public handleMouseClick(_intersected: Intersection<Object3D>): void {
    // Empty here
  }
  public updateWithOptions(
    options: Partial<ThreeDRendererRaycasterOptions>
  ): void {
    if (options.isActive !== undefined) {
      this._isActive = options.isActive;
    }
  }

  private _handleMouseMove(
    mouseEvent: MouseEvent,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera
  ): void {
    const intersects = this._getRaycasterIntersections(
      mouseEvent,
      threeDRendererRenderer,
      threeDRendererScene,
      threeDRendererCamera
    );
    if (intersects.length > 0) {
      this.handleMouseOver(intersects[0]);
    } else {
      this.handleMouseOut();
    }
  }

  private _handleMouseDblClick(
    mouseEvent: MouseEvent,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera
  ): void {
    const intersects = this._getRaycasterIntersections(
      mouseEvent,
      threeDRendererRenderer,
      threeDRendererScene,
      threeDRendererCamera
    );
    if (intersects.length > 0) {
      this.handleMouseDblClick(intersects[0]);
    }
  }

  private _handleMouseClick(
    mouseEvent: MouseEvent,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera
  ): void {
    const intersects = this._getRaycasterIntersections(
      mouseEvent,
      threeDRendererRenderer,
      threeDRendererScene,
      threeDRendererCamera
    );
    if (intersects.length > 0) {
      this.handleMouseClick(intersects[0]);
    }
  }

  private _getRaycasterIntersections(
    mouseEvent: MouseEvent,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera
  ): Array<Intersection<Object3D>> {
    const mouse = new Vector2();
    mouse.x =
      ((mouseEvent.clientX - threeDRendererRenderer.domElement.offsetLeft) /
        threeDRendererRenderer.domElement.clientWidth) *
        2 -
      1;
    mouse.y =
      -(
        (mouseEvent.clientY - threeDRendererRenderer.domElement.offsetTop) /
        threeDRendererRenderer.domElement.clientHeight
      ) *
        2 +
      1;
    this.setFromCamera(mouse, threeDRendererCamera);
    return this.intersectObjects(threeDRendererScene.children, true).filter(
      (int) => {
        return (
          (int.object as any).onMouseOver !== undefined ||
          (int.object.parent as any).onMouseOver !== undefined
        );
      }
    );
  }
}

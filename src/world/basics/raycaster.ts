import { Intersection, Raycaster, Vector2 } from 'three';
import { IConfigurable } from '../../shared/interfaces';
import { ThreeDRendererCamera } from '../basics/camera';
import { ThreeDRendererScene } from '../basics/scene';
import { ThreeDRendererRenderer } from '../systems/renderer';
import {
  DEFAULT_RAYCASTER_OPTIONS,
  ThreeDRendererRaycasterOptions
} from './raycaster-options';

export class ThreeDRendererRaycaster
  extends Raycaster
  implements IConfigurable<ThreeDRendererRaycasterOptions>
{
  private _isActive = true;
  private _document: Document;
  private _intersected: Intersection | undefined;
  private _boundMouseMoveHandler: (mouseEvent: MouseEvent) => void;
  private _boundMouseDblClickHandler: (mouseEvent: MouseEvent) => void;
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
      ...initOptions
    };
    this._document = domContainer.ownerDocument;
    this._isActive = options.isActive;
    this._boundMouseMoveHandler = (mouseEvent: MouseEvent) => {
      if (this._isActive) {
        this._handleMouseMove(
          mouseEvent,
          threeDRendererRenderer,
          threeDRendererScene,
          threeDRendererCamera
        );
      }
    };
    this._boundMouseDblClickHandler = (mouseEvent: MouseEvent) => {
      if (this._isActive) {
        this._handleMouseDblClick(
          mouseEvent,
          threeDRendererRenderer,
          threeDRendererScene,
          threeDRendererCamera
        );
      }
    };
    this._document.addEventListener(
      'mousemove',
      this._boundMouseMoveHandler,
      false
    );
    this._document.addEventListener(
      'dblclick',
      this._boundMouseDblClickHandler,
      false
    );
  }

  public handleMouseOver(_intersected: Intersection): void {
    // Empty here
  }
  public handleMouseOut(_intersected: Intersection): void {
    // Empty here
  }
  public handleMouseDblClick(_intersected: Intersection): void {
    // Empty here
  }
  public updateWithOptions(
    options: Partial<ThreeDRendererRaycasterOptions>
  ): void {
    if (options.isActive !== undefined) {
      this._isActive = options.isActive;
    }
  }
  /**
   * clear all event listeners
   */
  public dispose(): void {
    this._document.removeEventListener(
      'mousemove',
      this._boundMouseMoveHandler,
      false
    );
    this._document.removeEventListener(
      'dblclick',
      this._boundMouseDblClickHandler,
      false
    );
  }

  public clearIntersected(): void {
    this._intersected = undefined;
  }

  public get intersected(): Intersection | undefined {
    return this._intersected;
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
      this._intersected = intersects[0];
      this.handleMouseOver(intersects[0]);
    } else if (this._intersected !== undefined) {
      this.handleMouseOut({ ...this._intersected });
      this._intersected = undefined;
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

  private _getRaycasterIntersections(
    mouseEvent: MouseEvent,
    threeDRendererRenderer: ThreeDRendererRenderer,
    threeDRendererScene: ThreeDRendererScene,
    threeDRendererCamera: ThreeDRendererCamera
  ): Intersection[] {
    const mouse = new Vector2();
    const boundRect = threeDRendererRenderer.domElement.getBoundingClientRect();
    mouse.x =
      ((mouseEvent.clientX - boundRect.left) /
        threeDRendererRenderer.domElement.clientWidth) *
        2 -
      1;
    mouse.y =
      -(
        (mouseEvent.clientY - boundRect.top) /
        threeDRendererRenderer.domElement.clientHeight
      ) *
        2 +
      1;
    this.setFromCamera(mouse, threeDRendererCamera);
    return this.intersectObjects(threeDRendererScene.clickableObjects, true);
  }
}

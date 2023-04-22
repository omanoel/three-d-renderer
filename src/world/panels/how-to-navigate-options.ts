import { ColorRepresentation } from 'three';
import { ThreeDRendererCssAbsolutePosition } from '../../shared/i-options';

/**
 * Represents the options available to alter the properties
 * of the InfiniteGridHelper (Group) object rendered by the library
 */
export interface ThreeDRendererHowToNavigateOptions {
  absolutePosition: ThreeDRendererCssAbsolutePosition;
  backGroundColor: ColorRepresentation;
  titleColor: ColorRepresentation;
  textColor: ColorRepresentation;
  textContent: string;
  opacity: number;
}

export const DEFAULT_HOWTONAVIGATE_OPTIONS: ThreeDRendererHowToNavigateOptions =
  {
    absolutePosition: { top: 230, left: 450 },
    backGroundColor: 'rgb(120, 120, 120)',
    titleColor: 'rgb(105, 240, 174)',
    textColor: 'rgb(255, 255, 255)',
    opacity: 0.8,
    textContent:
      'Left mouse click and drag for rotation around the camera target' +
      '<br>Right mouse click and drag for translation of the camera target' +
      '<br>Mouse wheel for zooming/dezooming from camera target' +
      '<br>Mouse over an object (red cross is the target) to display additional infos' +
      '<br>Double Click on red cross to define camera target',
  };

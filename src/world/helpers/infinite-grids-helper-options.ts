import { ColorRepresentation } from "three";
import { ThreeDRendererObject3DOptions } from "../../shared/i-options";

/**
 * Represents the options available to alter the properties
 * of the Grid (GridHelper[]) object(s) rendered by the library
 */
export interface ThreeDRendererInfiniteGridsHelperOptions
  extends ThreeDRendererObject3DOptions {
  /**
   * Color of the grid.
   *
   * @defaultValue 'white'
   */
  color: ColorRepresentation;
  /**
   * Opacity of the grid, in [0; 1]. Transparency is set to true when opacity < 1
   *
   * @defaultValue 0.5
   */
  opacity: number;
  /**
   * Size of the grid (total number of lines along one axis)
   *
   * @defaultValue 30
   */
  size: number;
  /**
   * Initial spacing between the lines, along both axes of the grid's plan
   *
   * @defaultValue 10
   */
  spacing: number;
  /**
   * Autoscaling options (reacting to orbit controls).
   * Activated by default with default options.
   */
  autoScale: ThreeDRendererInfiniteGridsHelperAutoScaleOptions;
}

export interface ThreeDRendererInfiniteGridsHelperAutoScaleOptions {
  /**
   * GridHelper reacts to the OrbitControl changes if true. Default is true.
   *
   * @defaultValue true
   */
  active: boolean;
  /**
   * Approximate maximum number of lines to see on screen before jumping to new scale
   *
   * @defaultValue 12
   */
  linesOnScreen: number;
  /**
   * Factor used to switch to the next/previous spacing scale
   * Example: if the scaleJump is 10, and the spacing is 8, the next spacing will be spacing * scaleJump = 8 * 10 = 80
   *
   * @defaultValue 10
   */
  scaleJump: number;
}

export enum ZoomTypes {
  IN = "IN",
  OUT = "OUT",
}

/** Types of predefined Grids */
export enum ThreeDRendererGridTypes {
  /** A "CORNER" Grid is defined so that the three grid panels are joint by one or two of their edges, forming a corner. */
  CORNER = "CORNER",
  /** A "CENTER" Grid is setting by default all centers of the grid panels in one point. */
  CENTER = "CENTER",
}

export const DEFAULT_INFINITE_GRIDS_HELPER_OPTIONS: ThreeDRendererInfiniteGridsHelperOptions =
  {
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    color: "white",
    opacity: 0.2,
    size: 10,
    spacing: 1,
    autoScale: {
      active: true,
      linesOnScreen: 10,
      scaleJump: 1,
    },
    // TODO manage options per panel
    // panelXZ: {
    //   visible: true,
    //   position: {
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   color: 'white',
    //   opacity: 0.5,
    //   size: 30,
    //   spacing: 1,
    //   autoScale: {
    //     active: true,
    //     linesOnScreen: 10,
    //     scaleJump: 5
    //   }
    // },
    // panelXY: {
    //   visible: true,
    //   position: {
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   color: 'white',
    //   opacity: 0.5,
    //   size: 30,
    //   spacing: 1,
    //   autoScale: {
    //     active: true,
    //     linesOnScreen: 10,
    //     scaleJump: 5
    //   }
    // },
    // panelYZ: {
    //   visible: true,
    //   position: {
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   color: 'white',
    //   opacity: 0.5,
    //   size: 30,
    //   spacing: 1,
    //   autoScale: {
    //     active: true,
    //     linesOnScreen: 10,
    //     scaleJump: 5
    //   }
    // }
  };

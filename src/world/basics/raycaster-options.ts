import { Object3D } from "three";

export interface ThreeDRendererRaycasterOptions {
  isActive: boolean;
  tickables: Object3D<Event>[];
}

export const DEFAULT_RAYCASTER_OPTIONS: ThreeDRendererRaycasterOptions = {
  isActive: true,
  tickables: [],
};

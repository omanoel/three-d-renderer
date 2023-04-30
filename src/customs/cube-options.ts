import { ColorRepresentation } from 'three';
import { SharedObject3DOptions } from '../shared/i-options';

export interface CustomCubeOptions extends SharedObject3DOptions {
  color: ColorRepresentation;
}

export const DEFAULT_CUSTOM_CUBE_OPTIONS: CustomCubeOptions = {
  position: {
    x: 50,
    y: 50,
    z: 50
  },
  visible: true,
  color: 'aquamarine'
};

import { Box3, Object3D, Vector3 } from 'three';

export class SharedBoundingBoxUtil {
  public buildFromObj(obj: Object3D): Vector3[] {
    var bbox = new Box3().setFromObject(obj);
    return [bbox.min, bbox.max];
  }
}

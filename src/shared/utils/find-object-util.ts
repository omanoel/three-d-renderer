import { Object3D } from 'three';

export class FindObjectUtil {
  private constructor() {
    //
  }

  public static findMethodMouseOver(obj: Object3D): Object3D | undefined {
    if (obj.userData.onMouseOver !== undefined) {
      return obj;
    } else if (obj.parent !== null) {
      return FindObjectUtil.findMethodMouseOver(obj.parent);
    } else {
      return undefined;
    }
  }
  public static findMethodMouseOut(obj: Object3D): Object3D | undefined {
    if (obj.userData.onMouseOut !== undefined) {
      return obj;
    } else if (obj.parent !== null) {
      return FindObjectUtil.findMethodMouseOut(obj.parent);
    } else {
      return undefined;
    }
  }
}

import { GridHelper, Group } from 'three';

export class ExpandedGridHelpers {
  private _gridHelpers: Group;
  constructor() {
    //
    const gridXY = new GridHelper();
    const gridYZ = gridXY.clone();
    gridYZ.rotateX(Math.PI / 2);
    const gridXZ = gridXY.clone();
    gridXZ.rotateZ(Math.PI / 2);
    this._gridHelpers = new Group();
    this._gridHelpers.add(gridXY, gridYZ, gridXZ);
  }

  public get gridHelpers(): Group {
    return this._gridHelpers;
  }
}

import { BufferGeometry, Material, Mesh } from "three";
import { IClickable } from "../../shared/i-clickable";
import { ITickable } from "../../shared/i-tickable";

export class ThreeDRendererCube extends Mesh implements IClickable, ITickable {
  //
  constructor(geometry: BufferGeometry, material: Material | Material[]) {
    super(geometry, material);
    this.name = "Cube";
  }

  //
  public tick(_delta: number): void {
    // specific behavior for update
  }
  public onMouseOver(): void {
    // specific behavior for update
  }
  public onMouseOut(): void {
    // specific behavior for update
  }
  public onMouseClick(): void {
    // specific behavior for update
  }
}

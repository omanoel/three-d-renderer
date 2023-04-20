import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { IClickable } from "../../shared/i-clickable";
import { ITickable } from "../../shared/i-tickable";
import { ThreeDRendererCubeEvent } from "./cube-options";

export class ThreeDRendererCube
  extends Group
  implements IClickable<ThreeDRendererCubeEvent>, ITickable
{
  //
  constructor() {
    super();
    this.name = "Cube";
    // create a geometry
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({ color: "lightblue" });
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.position.set(-0.5, -0.1, 0.8);
    cube.rotation.set(-0.5, -0.1, 0.8);
    this.add(cube);
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
  public onMouseClick(_event: ThreeDRendererCubeEvent): void {
    // specific behavior for update
  }
}

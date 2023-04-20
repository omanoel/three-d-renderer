import { ThreeDRendererWorld } from "./world/world";
import "./style.css";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { ThreeDRendererCube } from "./app/components/cube";
import { ThreeDRendererCubeEvent } from "./app/components/cube-options";

const container = document.querySelector<HTMLDivElement>("#scene-container");

if (container != null) {
  const loader = new FontLoader();
  loader.load("/assets/fonts/optimer_bold.typeface.json", (responseFont) => {
    const world = new ThreeDRendererWorld(container, responseFont);
    const cube: ThreeDRendererCube = new ThreeDRendererCube();
    cube.onMouseClick = (event: ThreeDRendererCubeEvent) => {
      alert("click");
    };
    world.addGroup(cube);
    world.render();
  });
}

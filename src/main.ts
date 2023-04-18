import { ThreeDRendererWorld } from "./world/world";
import "./style.css";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const container = document.querySelector<HTMLDivElement>("#scene-container");

if (container != null) {
  const loader = new FontLoader();
  loader.load("/assets/fonts/optimer_bold.typeface.json", (responseFont) => {
    const world = new ThreeDRendererWorld(container, responseFont);
    world.addMesh();
    world.render();
  });
}

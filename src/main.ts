import { ThreeDRendererWorld } from "./world/world";
import "./style.css";

const container = document.querySelector<HTMLDivElement>("#scene-container");

if (container != null) {
  const world = new ThreeDRendererWorld(container);
  world.addMesh();
  world.render();
}

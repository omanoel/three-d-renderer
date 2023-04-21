import { ThreeDRendererCube } from './app/components/cube';
import { ThreeDRendererCubeEvent } from './app/components/cube-options';
import './style.css';
import { ThreeDRendererWorld } from './world/world';

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (container != null) {
  const world = new ThreeDRendererWorld(container);
  const cube: ThreeDRendererCube = new ThreeDRendererCube();
  cube.onMouseClick = (_event: ThreeDRendererCubeEvent) => {
    alert('click');
  };
  world.api.addGroup(cube);
  world.render();
}

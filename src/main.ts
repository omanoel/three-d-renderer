import { World } from './app/world';
import './style.css';

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (container != null) {
  const world = new World(container);
  world.render();
}

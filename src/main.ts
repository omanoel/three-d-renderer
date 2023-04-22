import { ThreeDRendererCube } from './app/components/cube';
import './style.css';
import { ThreeDRendererWorld } from './world/world';

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (container != null) {
  const world = new ThreeDRendererWorld(container);
  const cube: ThreeDRendererCube = new ThreeDRendererCube();
  world.api.addGroup(cube);
  world.render();
  document.getElementById('reset-view-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      world.api.resetView();
      mouseEvent.stopPropagation();
    },
    false
  );
  document.getElementById('how-to-navigate-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      world.api.showHowToNavigateDialogBox();
      mouseEvent.stopPropagation();
    },
    false
  );
  document.getElementById('dialog-box-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      world.api.showDialogBox('default');
      mouseEvent.stopPropagation();
    },
    false
  );
}

import { ComponentCube } from './components/cube';
import './style.css';
import { ThreeDRendererWorld } from './world/world';
import { DEFAULT_WORLD_OPTIONS } from './world/world-options';

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (container != null) {
  const world = new ThreeDRendererWorld(container);
  const cube: ComponentCube = new ComponentCube();
  world.api.addGroup(cube);
  /*
  cube.onMouseOver = () => {
    (cube.children[0] as any).material.color = 'red';
  };
  cube.onMouseOut = () => {
    (cube.children[0] as any).material.color = 'lightblue';
  };
  const sea: ComponentSea = new ComponentSea();
  const ground: ComponentGround = new ComponentGround();
  world.api.addGroup(sea);
  world.api.addGroup(ground);
  */
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
  document.getElementById('focus-view-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      world.api.focusView();
      mouseEvent.stopPropagation();
    },
    false
  );
  document.getElementById('options-btn')?.addEventListener(
    'click',
    (mouseEvent: MouseEvent) => {
      const panel = document.getElementById('options-panel');
      if (panel !== null) {
        panel.style.display =
          panel.style.display === 'none' || panel.style.display === ''
            ? 'inherit'
            : 'none';
      }
      mouseEvent.stopPropagation();
    },
    false
  );

  const textareaOptions = document.getElementById('options-textarea');
  if (textareaOptions) {
    (textareaOptions as HTMLTextAreaElement).value = JSON.stringify(
      DEFAULT_WORLD_OPTIONS
    );

    const updateBtnOptions = document.getElementById('options-update-btn');
    if (updateBtnOptions) {
      updateBtnOptions.addEventListener('click', () => {
        world.api.updateWithOptions(
          JSON.parse((textareaOptions as HTMLTextAreaElement).value)
        );
      });
    }
  }
}
